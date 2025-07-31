import axios from 'axios';
import axiosRetry from 'axios-retry';
import * as cheerio from 'cheerio';
import https from 'https';
import pLimit from 'p-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import summarizerQueue from '../queues/aiQueue.js';
import Article from '../models/Article.js';
import Url from '../models/Url.js';

// Concurrency limiter: max 5 at a time
const limit = pLimit(5);

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

// HTTPS agent for keep-alive
const httpsAgent = new https.Agent({ keepAlive: true, maxSockets: 10 });

async function guardianNews() {
  try {
    // Fetch homepage
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

    // Collect article objects
    const articles = [];
    $('a.dcr-2yd10d').each((_, el) => {
      const link = $(el).attr('href');
      const title = $(el).attr('aria-label') || $(el).text().trim();
      if (link && title) {
        const url = link.startsWith('http') ? link : new URL(link, baseUrl).href;
        articles.push({ title, url, content: '', image: null });
      }
    });

    // Process with concurrency limit
    const tasks = articles.map(article => limit(async () => {
      try {
        // Skip if exists
        if (await Url.exists({ url: article.url }) || await Article.exists({ url: article.url })) {
          return;
        }

        // Fetch detail page
        const res = await axios.get(article.url, {
          httpsAgent,
          timeout: 10000,
          headers: { 'User-Agent': agents[Math.floor(Math.random() * agents.length)] },
        });
        const $$ = cheerio.load(res.data);

        // Extract paragraphs
        const paras = $$('article p')
          .map((_, p) => $$(p).text().trim())
          .get()
          .filter(t => t.length > 30);
        article.content = paras.join(' ');

        // Extract image from LightboxLayout
        const lightbox = $$('gu-island[name="LightboxLayout"]').attr('props');
        if (lightbox) {
          try {
            const json = JSON.parse(lightbox);
            if (Array.isArray(json.images) && json.images.length) {
              article.image = json.images[0].masterUrl;
            }
          } catch {}
        }

        // Save & queue if valid
        if (article.content && article.image) {
          await new Url({ url: article.url }).save();
          await summarizerQueue.add('summarize', { newArticle: { ...article, source: 'The Guardian' } });
        }
      } catch (err) {
        console.error('❌ Error processing', article.url, err.message);
      }
    }));

    await Promise.all(tasks);
    console.log('✅ Guardian scraping completed');
  } catch (err) {
    console.error('🚨 Guardian fetch error:', err.message);
  }
}

export default guardianNews;
