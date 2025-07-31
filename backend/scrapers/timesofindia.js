import axios from 'axios';
import axiosRetry from 'axios-retry';
import * as cheerio from 'cheerio';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';
import summarizerQueue from '../queues/aiQueue.js'; // Adjust path as needed
import Article from '../models/Article.js';
import Url from '../models/Url.js';
import pLimit from 'p-limit';
import globalLimiter from '../utils/limiter.js';
// Setup __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const limit = pLimit(5);
// 🔗 Base URL and User-Agent pool
const baseUrl = 'https://timesofindia.indiatimes.com/';
const agents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.1 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:45.0) Gecko/20100101 Firefox/45.0',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E304',
];

// Configure axios to retry on network errors
axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: error =>
    axiosRetry.isNetworkOrIdempotentRequestError(error) || error.code === 'ECONNRESET',
});

// HTTPS agent for keep-alive connections
const httpsAgent = new https.Agent({ keepAlive: true, maxSockets: 10 });

async function toiNews() {
  const allArticles = [];

  try {
    // console.log('📡 Fetching TOI homepage...');
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

    // 🔍 Collect headline links
    const selectors = ['._YVis', '.Hn2z7', '.list9', '.FWW4m', '.BWUrF'];
    selectors.forEach(sel => {
      $(sel).each((_, el) => {
        const linkEl = $(el).find('a').first();
        let title = linkEl.find('.ObA_k').text().trim() || linkEl.text().trim();
        let url = linkEl.attr('href');
        if (title && url) {
          if (!url.startsWith('http')) url = new URL(url, baseUrl).href;
          allArticles.push({ title, url, image: null, content: '' });
        }
      });
    });

    // console.log(`📰 Found ${allArticles.length} article previews`);

    // Process each article sequentially 🚶‍♂️
  const tasks = allArticles.map(article => globalLimiter(async () => {
      try {
        // Skip if already processed 🔄
        if (await Url.exists({ url: article.url }) || await Article.exists({ url: article.url })) {
          // console.log(`🔄 Already exists: ${article.url}`);
          return;
        }

        // console.log(`📄 Fetching detail: ${article.title}`);
        const res = await axios.get(article.url, {
          httpsAgent,
          headers: { 'User-Agent': agents[Math.floor(Math.random() * agents.length)] },
          timeout: 10000,
        });
        const $$ = cheerio.load(res.data);

        // Extract paragraphs ✍️
        const paras = $$('span.id-r-component[data-ua-type="1"], div.M1rHh')
          .filter((_, el) => {
            const text = $$(el).text().trim();
            return text.length > 50 && !/^Also Read/i.test(text) && !/^Photo Credit/i.test(text);
          })
          .map((_, el) => $$(el).text().trim())
          .get();

        article.content = paras.join(' ').replace(/\s+/g, ' ').trim();

        // Extract main image 📸
        const imgEl = $$('section.leadmedia img').first();
        if (imgEl.length) {
          let src = imgEl.attr('src');
          if (src) article.image = src.startsWith('http') ? src : new URL(src, baseUrl).href;
        }

        // Enqueue summarization ✅
        if (article.content && article.image) {
          const newArticle = { ...article, source: 'Times of India' };
          const newUrl = new Url({ url: article.url });
          await newUrl.save();
          await summarizerQueue.add(
            'summarize',
            { newArticle },
          );
          // console.log(`📩 Queued article: ${article.title}`);
        } else {
          // console.warn(`⚠️ Skipping incomplete: ${article.url}`);
        }
      } catch (err) {
        // console.error(`❌ Detail fetch error: ${article.url}`, err.message);
      }
    }));
    await Promise.all(tasks);

    // console.log('✅ TOI scraping completed successfully.');
  } catch (error) {
    // console.error('🌐 Network or parsing error:', error.message);
  }
}



export default toiNews;
