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
const baseUrl = 'https://www.ndtv.com';
const agents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.1 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:45.0) Gecko/20100101 Firefox/45.0',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E304',
];

axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: error =>
    axiosRetry.isNetworkOrIdempotentRequestError(error) || error.code === 'ECONNRESET',
});

const httpsAgent = new https.Agent({ keepAlive: true, maxSockets: 10 });

async function ndtvNews() {
  try {
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

    const tasks = links.map(article =>
      globalLimiter(async () => {
        try {
          if (
            await Url.exists({ url: article.url }) ||
            await Article.exists({ url: article.url })
          ) return;

          const { data: artHtml } = await axios.get(article.url, {
            httpsAgent,
            headers: {
              'User-Agent': agents[Math.floor(Math.random() * agents.length)],
            },
            timeout: 10000,
          });

          const $$ = cheerio.load(artHtml);

          const paragraphs = $$('div[itemprop="articleBody"] p')
            .map((_, p) => $$(p).text().trim())
            .get()
            .filter(p => p.length > 0);
          article.content = paragraphs.join('\n\n');

          const imgEl = $$('figure img, .ins_instory_dv img, .content_img img').first();
          article.image = imgEl.attr('src') || '';

          if (!article.image) {
            const og = $$('meta[property="og:image"]').attr('content');
            if (og && og.startsWith('http')) article.image = og;
          }

          // 🔥 Free memory by clearing DOM
          $$.root().remove();


          console.log("📝 content length:", article.content.length);
          console.log("🖼️ image:", article.image);

          if (article.content.length > 100 && article.image) {
            const newArticle = { ...article, source: 'NDTV' };
            const newUrl = new Url({ url: article.url });
            await newUrl.save();
            await summarizerQueue.add('summarize', { newArticle });
          }
        } catch (err) {
          // Log if needed
        }
      })
    );

    await Promise.all(tasks);
  } catch (err) {
    // Log if needed
  }
}

export default ndtvNews;
