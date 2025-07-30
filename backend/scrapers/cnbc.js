import axios from 'axios';
import axiosRetry from 'axios-retry';
import * as cheerio from 'cheerio';
import https from 'https';
import Article from '../models/Article.js';
import summarizerQueue from '../queues/aiQueue.js';
import Redis from 'ioredis';

// Base URL and User-Agent pool
const redisClient = new Redis(process.env.REDIS_URL);
const baseUrl = 'https://www.cnbc.com';
const agents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.1 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:45.0) Gecko/20100101 Firefox/45.0',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E304',
];

// Retry on network errors
axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: error =>
    axiosRetry.isNetworkOrIdempotentRequestError(error) || error.code === 'ECONNRESET',
});

// HTTPS agent for keep-alive
const httpsAgent = new https.Agent({ keepAlive: true, maxSockets: 10 });

async function cnbcNews() {
  try {
    console.log('🔍 Fetching CNBC homepage...');
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

    // Select links containing date pattern
    const links = [];
    $('a[href*="/2025/"]').each((_, el) => {
      let url = $(el).attr('href');
      const title = $(el).text().trim();
      if (!title || !url.endsWith('.html')) return;
      // Normalize URL
      if (!url.startsWith('http')) url = baseUrl + url;

      // Extract initial image
      let image = null;
      const imgTag = $(el).find('img').first();
      if (imgTag.length) image = imgTag.attr('src') || imgTag.attr('data-src');

      links.push({ title, url, image, content: '' });
    });

    // Deduplicate URLs
    const seen = new Set();
    const articles = links.filter(a => {
      if (seen.has(a.url)) return false;
      seen.add(a.url);
      return true;
    });
    console.log(`🛎️ Found ${articles.length} unique previews`);
     let allUrls = links.map(link => link.url);
        const existing = await Article.find({ url: { $in: allUrls } }).select('url');
        const dbUrlsSet = new Set(existing.map(a => a.url));
    

    // Process each article sequentially 🚶‍♀️
    for (const article of articles) {
      try {
        // Skip if already in DB
       if (dbUrlsSet.has(article.url)) continue;  
         const isNew = await redisClient.sadd('scraped:cnbc:urls', article.url);
      if (isNew === 0) continue;           // already seen before

      // Set a TTL on the set key (once)
      if ((await redisClient.ttl('scraped:cnbc:urls')) < 0) {
        await redisClient.expire('scraped:cnbc:urls', 7 * 24 * 3600);
      } 

        console.log(`📥 Fetching page: ${article.url}`);
        const res = await axios.get(article.url, {
          httpsAgent,
          headers: {
            'User-Agent': agents[Math.floor(Math.random() * agents.length)],
          },
          timeout: 10000,
        });
        const $$ = cheerio.load(res.data);

        // Extract content paragraphs
        article.content = $$('div.ArticleBody-articleBody p')
          .map((i, p) => $$(p).text().trim())
          .get()
          .filter(t => t.length > 20)
          .join(' ');

        // Fallback OG image
        if (!article.image) {
          const og = $$('meta[property="og:image"]').attr('content');
          if (og && og.startsWith('http')) article.image = og;
        }

        // Enqueue if valid
        if (article.content && article.image) {
          await summarizerQueue.add(
            'summarize',
            { newArticle: { ...article, source: 'CNBC' } },
            {
              jobId: article.url,           // 🏷️ unique ID
              removeOnComplete: true,       // ✨ auto‑clean
              removeOnFail: { age: 3600 },  // ⏳ clean failures after 1h
            }
          );
          console.log(`✅ Queued: ${article.url}`);
        } else {
          console.warn(`⚠️ Incomplete, skipped: ${article.url}`);
        }
      } catch (err) {
        console.error(`❌ Error processing ${article.url}:`, err.message);
      }
    }

    console.log('🎉 CNBC scraping completed');
  } catch (err) {
    console.error('🚨 Fetch error:', err.message);
  }
}

// Schedule: run immediately and every hour
cnbcNews();
setInterval(cnbcNews, 3 * 60 * 60 * 1000);

export default cnbcNews;
