import axios from 'axios';
import axiosRetry from 'axios-retry';
import * as cheerio from 'cheerio';
import https from 'https';
import Redis from 'ioredis';
import Article from '../models/Article.js';
import summarizerQueue from '../queues/aiQueue.js';

const redisClient = new Redis(process.env.REDIS_URL);

// Base URL and UA pool
const baseUrl = 'https://www.aljazeera.com';
const agents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.1 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:45.0) Gecko/20100101 Firefox/45.0',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E304',
];

// Axios retry + HTTPS keep‑alive
axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: err =>
    axiosRetry.isNetworkOrIdempotentRequestError(err) || err.code === 'ECONNRESET',
});
const httpsAgent = new https.Agent({ keepAlive: true, maxSockets: 10 });

async function scrapeAlJazeeraNews() {
  try {
    console.log('🌐 Fetching Al Jazeera news list…');

    // 1️⃣ Collect & dedupe links
    const listRes = await axios.get(`${baseUrl}/news/`, {
      httpsAgent,
      headers: {
        'User-Agent': agents[Math.floor(Math.random() * agents.length)],
        'Accept-Language': 'en-US,en;q=0.9',
      },
      timeout: 10000,
    });
    const $ = cheerio.load(listRes.data);

    const links = new Set();
    $('article.u-clickable-card').each((_, el) => {
      const href = $(el).find('a.u-clickable-card__link').attr('href');
      if (href && !href.includes('/liveblog/')) {
        links.add(baseUrl + href);
      }
    });
    console.log(`📰 Found ${links.size} articles`);

    if (links.size === 0) return;

    // 2️⃣ Batch DB check
    const allUrls = [...links];
    const existing = await Article.find({ url: { $in: allUrls } }).select('url');
    const dbUrlsSet = new Set(existing.map(a => a.url));

    // 3️⃣ Process each new link
    for (const url of allUrls) {
      if (dbUrlsSet.has(url)) continue;       // already in Mongo

      // 4️⃣ Redis SADD dedupe
      const isNew = await redisClient.sadd('scraped:aljazeera:urls', url);
      if (isNew === 0) continue;             // already seen before

      // Set a TTL on the set key (once)
      if ((await redisClient.ttl('scraped:aljazeera:urls')) < 0) {
        await redisClient.expire('scraped:aljazeera:urls', 7 * 24 * 3600);
      } 

      // 5️⃣ Fetch detail & enqueue
      console.log(`📄 Fetching detail: ${url}`);
      const detailRes = await axios.get(url, {
        httpsAgent,
        headers: {
          'User-Agent': agents[Math.floor(Math.random() * agents.length)],
          'Accept-Language': 'en-US,en;q=0.9',
        },
        timeout: 10000,
      });
      const $$ = cheerio.load(detailRes.data);

      // Parse JSON body or fallback HTML
      const raw = $$('#__NEXT_DATA__').html();
      let content = '', image = '';
      if (raw) {
        try {
          const data = JSON.parse(raw);
          const story = data.props.pageProps.story || data.props.pageProps.article;
          if (story?.body) {
            content = story.body.map(n => n.children?.map(c => c.text).join('')).join('\n\n');
          }
          image = story?.leadImage?.url || story?.imageUrl || '';
        } catch {}
      }
      if (!content) {
        content = $$('div.wysiwyg p').map((i, p) => $$(p).text().trim()).get().join('\n\n');
      }
      if (!image) {
        image =
          $$('meta[property="og:image"]').attr('content') ||
          $$('figure img').first().attr('src') || '';
        if (image.startsWith('/')) image = baseUrl + image;
      }

      if (content && image) {
        const newArticle = {
          title: $$('h1').text().trim(),
          url,
          source: 'AlJazeera',
          image,
          content,
        };
        await summarizerQueue.add(
          'summarize',
          { newArticle },
          { jobId: url, removeOnComplete: true, removeOnFail: { age: 3600 } }
        );
        console.log(`✅ Queued: ${url}`);
      } else {
        console.warn(`⚠️ Incomplete data for ${url}`);
      }
    }

    console.log('✅ Al Jazeera scraping done');
  } catch (err) {
    console.error('🚨 Scrape error:', err.message);
  }
}

// Run now and every 2 hours
scrapeAlJazeeraNews();
setInterval(scrapeAlJazeeraNews, 3 * 60 * 60 * 1000);

export default scrapeAlJazeeraNews;
