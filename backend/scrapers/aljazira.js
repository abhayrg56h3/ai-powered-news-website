import axios from 'axios';
import axiosRetry from 'axios-retry';
import * as cheerio from 'cheerio';
import https from 'https';
import pLimit from 'p-limit';
import Article from '../models/Article.js';
import Url from '../models/Url.js';
import summarizerQueue from '../queues/aiQueue.js';
import globalLimiter from '../utils/limiter.js';

// Concurrency limiter: only 5 tasks at a time


// Base URL and User-Agent pool
const baseUrl = 'https://www.aljazeera.com';
const agents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.1 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:45.0) Gecko/20100101 Firefox/45.0',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E304',
];

// Configure axios retry on network errors
axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: error =>
    axiosRetry.isNetworkOrIdempotentRequestError(error) || error.code === 'ECONNRESET',
});

// HTTPS agent for keep-alive
const httpsAgent = new https.Agent({ keepAlive: true, maxSockets: 10 });

async function scrapeAlJazeeraNews() {
  try {
    // Fetch the news list
    const listRes = await axios.get(`${baseUrl}/news/`, {
      httpsAgent,
      headers: {
        'User-Agent': agents[Math.floor(Math.random() * agents.length)],
        'Accept-Language': 'en-US,en;q=0.9',
      },
      timeout: 10000,
    });
    const $ = cheerio.load(listRes.data);

    // Collect article URLs
    const links = [];
    $('article.u-clickable-card').each((_, el) => {
      const href = $(el).find('a.u-clickable-card__link').attr('href');
      if (href && !href.includes('/liveblog/')) {
        links.push(baseUrl + href);
      }
    });

    // Create scraping tasks with concurrency limit
    const tasks = links.map(url => globalLimiter(async () => {
      // Skip if already processed
      if (await Url.exists({ url }) || await Article.exists({ url })) {
        console.log(`🔗 Already processed: ${url}`);
        return;
      }

      try {
        // Fetch article detail
        const detailRes = await axios.get(url, {
          httpsAgent,
          headers: {
            'User-Agent': agents[Math.floor(Math.random() * agents.length)],
            'Accept-Language': 'en-US,en;q=0.9',
          },
          timeout: 10000,
        });
        const $$ = cheerio.load(detailRes.data);

        // Parse JSON data for content and image
        const raw = $$('#__NEXT_DATA__').html();
        let content = '';
        let image = '';

        if (raw) {
          try {
            const data = JSON.parse(raw);
            const story = data.props.pageProps.story || data.props.pageProps.article;
            if (story?.body) {
              content = story.body
                .map(n => n.children?.map(c => c.text).join(''))
                .join('\n\n');
            }
            image = story?.leadImage?.url || story?.imageUrl || '';
          } catch {}
        }

        // Fallback scraping if JSON parse fails
        if (!content) {
          content = $$('div.wysiwyg p')
            .map((_, p) => $$(p).text().trim())
            .get()
            .join('\n\n');
        }
        if (!image) {
          image = $$('meta[property="og:image"]').attr('content') || $$('figure img').first().attr('src') || '';
          if (image.startsWith('/')) image = baseUrl + image;
        }

        // If valid article, save URL and queue summary job
        if (content && image) {
          await new Url({ url }).save();
          const newArticle = {
            title: $$('h1').text().trim(),
            url,
            source: 'AlJazeera',
            image,
            content,
          };
          await summarizerQueue.add('summarize', { newArticle });
        }
      } catch (err) {
        console.error('❌ Error processing', url, err.message);
      }
    }));

    // Execute tasks
    await Promise.all(tasks);
    console.log('✅ Al Jazeera scraping done');
  } catch (err) {
    console.error('🚨 Fetch list error:', err.message);
  }
}

export default scrapeAlJazeeraNews;
