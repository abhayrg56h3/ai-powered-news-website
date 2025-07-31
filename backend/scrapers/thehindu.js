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
const baseUrl = 'https://www.thehindu.com/';
const agents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.1 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:45.0) Gecko/20100101 Firefox/45.0',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E304',
];

// Configure axios retry
axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: error =>
    axiosRetry.isNetworkOrIdempotentRequestError(error) || error.code === 'ECONNRESET',
});

// HTTPS Agent for connection reuse
const httpsAgent = new https.Agent({ keepAlive: true, maxSockets: 10 });

async function theHinduNews() {
  const allArticles = [];

  try {
    // console.log('🌐 Fetching The Hindu homepage...');
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

    // Scrape headlines 📰
    $('.element').each((_, el) => {
      const titleEl = $(el).find('h3.title a, h2.title a, h1.title a');
      const title = titleEl.text().trim();
      let url = titleEl.attr('href');
      if (title && url) {
        if (!url.startsWith('http')) url = baseUrl + url.replace(/^\//, '');
        allArticles.push({ title, url, image: null, content: '' });
      }
    });
    // console.log(`📰 Found ${allArticles.length} articles`);

    // Process each article sequentially 🚶‍♂️
    for (const article of allArticles) {
      try {

        // Skip if already in DB 🔄
        if (await Url.exists({ url: article.url }) || await Article.exists({ url: article.url })) {
          // console.log(`🔄 Already exists: ${article.url}`);
          continue;
        }

        // console.log(`🔗 Fetching detail: ${article.url}`);
        const { data: artHtml } = await axios.get(article.url, {
          httpsAgent,
          headers: {
            'User-Agent': agents[Math.floor(Math.random() * agents.length)],
          },
          timeout: 10000,
        });
        const $$ = cheerio.load(artHtml);

        // Extract paragraphs ✍️
        const paras = $$('div.articlebodycontent .schemaDiv > p')
          .filter((_, p) => {
            const t = $$(p).text().trim();
            return t && !/^Published\s*-/.test(t) && !/^(Photo Credit:|Also Read)/.test(t);
          })
          .map((_, p) => $$(p).text().trim())
          .get();
        article.content = paras.join(' ');

        // Extract image via schema metadata 📸
        const imgUrl =
          $$('span[itemprop="image"] meta[itemprop="url"]').attr('content') ||
          $$('meta[itemprop="image"]').attr('content') ||
          null;
        article.image = imgUrl;

        // Enqueue if valid ✅
        if (article.content && article.image) {
          const newArticle = { ...article, source: 'The Hindu' };
          const newUrl = new Url({ url: article.url });
          await newUrl.save();
          await summarizerQueue.add(
            'summarize',
            { newArticle }
          );
          // console.log(`📤 Enqueued: ${article.title}`);
        } else {
          // console.warn(`⚠️ Skipping incomplete article: ${article.url}`);
        }
      } catch (err) {
        // console.error(`❌ Error on ${article.url}:`, err.message);
      }
    }

    // console.log('✅ The Hindu scraping completed!');
  } catch (error) {
    // console.error(' Homepage fetch error:', error.message);
  }
}


export default theHinduNews;
