import axios from 'axios';
import axiosRetry from 'axios-retry';
import * as cheerio from 'cheerio';
import https from 'https';
import Article from '../models/Article.js';
import summarizerQueue from '../queues/aiQueue.js';
import Url from '../models/Url.js';
import pLimit from 'p-limit';
import globalLimiter from '../utils/limiter.js';
 

const limit = pLimit(5);
// Base URL and User-Agent pool
const baseUrl = 'https://www.ndtv.com';
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

async function ndtvNews() {
  try {
    // console.log('🌐 Fetching NDTV homepage...');
    const { data: homeHtml } = await axios.get(baseUrl, {
      httpsAgent,
      headers: {
        'User-Agent': agents[Math.floor(Math.random() * agents.length)],
        'Accept': 'text/html,application/xhtml+xml,application/xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      timeout: 10000,
    });

    const $home = cheerio.load(homeHtml);
    const links = [];

    // Collect candidate links
    $home('a').each((_, el) => {
      const href = $home(el).attr('href');
      const title = $home(el).text().trim();
      if (
        href?.startsWith(baseUrl) &&
        !href.includes('/photos/') &&
        !href.includes('/videos/') &&
        !href.includes('#') &&
        title.length >= 10 &&
        !links.some(a => a.url === href)
      ) {
        links.push({ title, url: href, content: '', image: '' });
      }
    });
    // console.log(`📰 Found ${links.length} candidate links.`);

    // Process each article sequentially 🚶‍♂️
    const tasks = links.map(article => globalLimiter(async () => {
      try {
        // Skip if already in DB
        if (await Url.exists({ url: article.url }) || await Article.exists({ url: article.url })) return;

        // console.log(`🔗 Fetching: ${article.url}`);
        const { data: artHtml } = await axios.get(article.url, {
          httpsAgent,
          headers: {
            'User-Agent': agents[Math.floor(Math.random() * agents.length)],
          },
          timeout: 10000,
        });
        const $ = cheerio.load(artHtml);

        // Extract content paragraphs
        const paragraphs = $('div[itemprop="articleBody"] p')
          .map((_, p) => $(p).text().trim())
          .get()
          .filter(p => p.length > 0);
        article.content = paragraphs.join('\n\n');

        // Extract image
        const imgEl = $('figure img, .ins_instory_dv img, .content_img img').first();
        article.image = imgEl.attr('src') || '';

        // Fallback OG image
        if (!article.image) {
          const og = $('meta[property="og:image"]').attr('content');
          if (og && og.startsWith('http')) article.image = og;
        }

        // Enqueue summarization if valid
        if (article.content.length > 100 && article.image) {
          const newArticle = { ...article, source: 'NDTV' };
          const newUrl = new Url({
            url: article.url
          });
          await newUrl.save();
          await summarizerQueue.add(
            'summarize',
            { newArticle },
          );
          // console.log(`✅ Enqueued: ${article.title}`);
        } else {
          // console.warn(`⚠️ Skipped (too short/incomplete): ${article.url}`);
        }
      } catch (err) {
        // console.error(`❌ Error at ${article.url}:`, err.message);
      }
    }));
    await Promise.all(tasks);   

    // console.log('🎉 NDTV scraping completed!');
  } catch (err) {
    // console.error('🚨 Failed to fetch homepage:', err.message);
  }
}


export default ndtvNews;
