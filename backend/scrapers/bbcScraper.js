import axios from 'axios';
import axiosRetry from 'axios-retry';
import * as cheerio from 'cheerio';
import https from 'https';
import Article from '../models/Article.js';
import summarizerQueue from '../queues/aiQueue.js';
import Url from '../models/Url.js';
import globalLimiter from '../utils/limiter.js';

// Base URL for BBC News
const baseUrl = 'https://www.bbc.com';

// List of User-Agents to randomize requests
const agents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.1 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:45.0) Gecko/20100101 Firefox/45.0',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E304',
];

// Configure axios retry on network or idempotent errors
axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: error =>
    axiosRetry.isNetworkOrIdempotentRequestError(error) || error.code === 'ECONNRESET',
});

// HTTPS agent for keep-alive connections
const httpsAgent = new https.Agent({ keepAlive: true, maxSockets: 10 });

// Function to process a single article link
async function processLink({ title, url }) {
  // Skip if URL or Article already exists
  if (await Url.exists({ url }) || await Article.exists({ url })) {
    return;
  }

  try {
    // Fetch article detail page
    const detailRes = await axios.get(url, {
      httpsAgent,
      headers: {
        'User-Agent': agents[Math.floor(Math.random() * agents.length)],
      },
      timeout: 10000,
    });

    const $$ = cheerio.load(detailRes.data);

    // Extract paragraphs
    let paras = $$('div[data-component="text-block"] p')
      .map((i, p) => $$(p).text().trim())
      .get()
      .filter(Boolean);

    if (!paras.length) {
      paras = $$('article p')
        .map((i, p) => $$(p).text().trim())
        .get()
        .filter(Boolean);
    }

    const content = paras.join('\n\n');

    // Free Cheerio DOM memory
    $$.root().remove();

    // Extract image URL
    let image =
      $$('meta[property="og:image"]').attr('content') ||
      $$('meta[name="twitter:image"]').attr('content') || '';

    if (!image) {
      image = $$('figure[data-component="image-block"] img').attr('src') || '';
    }
    if (!image) {
      image = $$('article img').first().attr('src') || '';
    }
    if (image.startsWith('//')) image = 'https:' + image;
    else if (image.startsWith('/')) image = baseUrl + image;

    // Queue summarization if content and image exist
    if (content && image) {
      await new Url({ url }).save();
      await summarizerQueue.add('summarize', {
        newArticle: { title, url, source: 'BBC', image, content }
      });
      console.log(`✅ Queued: ${title}`);
    }
  } catch (err) {
    console.error(`❌ Error processing ${url}:`, err.message);
  }
}

// Main scraping function
async function scrapeBBCNews() {
  try {
    console.log('🌐 Fetching BBC News homepage...');
    const listRes = await axios.get(`${baseUrl}/news`, {
      httpsAgent,
      headers: {
        'User-Agent': agents[Math.floor(Math.random() * agents.length)],
        'Accept': 'text/html,application/xhtml+xml,application/xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      timeout: 10000,
    });

    const $ = cheerio.load(listRes.data);

    // Collect article links
    const links = [];
    $('a[data-testid="internal-link"]').has('h2').each((_, el) => {
      let href = $(el).attr('href');
      if (!href || href.includes('/live/') || href.includes('/av/')) return;
      if (!href.startsWith('http')) href = baseUrl + href;
      const title = $(el).find('h2').text().trim();
      if (title) links.push({ title, url: href });
    });

    // Limit to 30 articles per run
    const limitedLinks = links;
    console.log(`📰 Processing ${links.length} articles this run...`);

    // Sequentially process each link through the global limiter
    for (const link of limitedLinks) {
      await globalLimiter(() => processLink(link));
    }

    console.log('✅ BBC scraping completed!');
  } catch (err) {
    console.error('🚨 BBC listing fetch error:', err.message);
  }
}

export default scrapeBBCNews;
