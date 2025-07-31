import axios from 'axios';
import axiosRetry from 'axios-retry';
import * as cheerio from 'cheerio';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';
import summarizerQueue from '../queues/aiQueue.js';
import Article from '../models/Article.js';
import Url from '../models/Url.js';
// Setup __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base URL and User-Agent pool
const baseUrl = 'https://www.theguardian.com/international';
const agents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.1 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:45.0) Gecko/20100101 Firefox/45.0',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E304',
];

// Axios retry config
axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: error =>
    axiosRetry.isNetworkOrIdempotentRequestError(error) || error.code === 'ECONNRESET',
});

// HTTPS agent
const httpsAgent = new https.Agent({ keepAlive: true, maxSockets: 10 });

async function guardianNews() {
  const allArticles = [];

  try {
    console.log('🌐 Fetching Guardian homepage...');
    const { data } = await axios.get(baseUrl, {
      httpsAgent,
      headers: {
        'User-Agent': agents[Math.floor(Math.random() * agents.length)],
        'Accept': 'text/html,application/xhtml+xml,application/xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      timeout: 10000,
    });

    const $ = cheerio.load(data);

    // Collect article links
    $('a.dcr-2yd10d').each((_, el) => {
      const link = $(el).attr('href');
      const title = $(el).attr('aria-label') || $(el).text().trim();
      if (link && title) {
        const url = link.startsWith('http') ? link : new URL(link, baseUrl).href;
        allArticles.push({ title, url, image: null, content: '' });
      }
    });

    console.log(`📰 Found ${allArticles.length} articles`);

    // Sequentially process articles 🚶‍♂️
    for (const article of allArticles) {
      try {
        // Skip if already in DB
        if (await Url.exists({ url: article.url }) || await Article.exists({ url: article.url })) {
          
          continue
          };
        const exists = await Article.exists({ url: article.url }) || await summarizerQueue.getJob(article.url);
        if (exists) {
          console.log(`🔄 Already exists: ${article.url}`);
          continue;
        }

        console.log(`📝 Fetching details: ${article.url}`);
        const res = await axios.get(article.url, {
          httpsAgent,
          timeout: 10000,
          headers: {
            'User-Agent': agents[Math.floor(Math.random() * agents.length)],
          },
        });

        const $$ = cheerio.load(res.data);

        const paras = $$('article p')
          .map((_, p) => $$(p).text().trim())
          .get()
          .filter(t => t.length > 30);
        article.content = paras.join(' ');

        const lightbox = $$('gu-island[name="LightboxLayout"]').attr('props');
        if (lightbox) {
          try {
            const json = JSON.parse(lightbox);
            if (Array.isArray(json.images) && json.images.length) {
              article.image = json.images[0].masterUrl;
            }
          } catch {}
        }

        if (article.content && article.image) {
          // Save URL to prevent re-fetching
          const newUrl = new Url({ url: article.url });
          await newUrl.save();

          await summarizerQueue.add(
            'summarize',
            { newArticle: { ...article, source: 'The Guardian' } },
          );
          console.log(`📤 Enqueued summary: ${article.title}`);
        } else {
          console.warn(`⚠️ Skipped (missing content/image): ${article.url}`);
        }
      } catch (err) {
        console.error(`❌ Error processing ${article.url}:`, err.message);
      }
    }

    console.log('✅ Guardian scraping completed!');
  } catch (error) {
    console.error('🚨 Guardian homepage error:', error.message);
  }
}


export default guardianNews;
