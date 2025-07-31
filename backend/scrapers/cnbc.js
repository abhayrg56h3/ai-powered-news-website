import axios from 'axios';
import axiosRetry from 'axios-retry';
import * as cheerio from 'cheerio';
import https from 'https';
import Article from '../models/Article.js';
import summarizerQueue from '../queues/aiQueue.js';
import Url from '../models/Url.js';
// Base URL and User-Agent pool
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
    // console.log('🔍 Fetching CNBC homepage...');
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


    const articles = links;

    // Process each article sequentially 🚶‍♀️
    for (const article of articles) {
      try {
        // Skip if already in DB
      if( await Url.exists({ url: article.url }) || await Article.exists({ url: article.url })) continue;

        // console.log(`📥 Fetching page: ${article.url}`);
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
          const newUrl= new Url({
            url: article.url
          });
          await newUrl.save();
          await summarizerQueue.add(
            'summarize',
            { newArticle: { ...article, source: 'CNBC' } },
          );
          // console.log (`✅ Queued: ${article.url}`);
        } else {
          // console.warn(`⚠️ Incomplete, skipped: ${article.url}`);
        }
      } catch (err) {
        // console.error(`❌ Error processing ${article.url}:`, err.message);
      }
    }

    // console.log('🎉 CNBC scraping completed');
  } catch (err) {
    // console.error('🚨 Fetch error:', err.message);
  }
}



export default cnbcNews;
