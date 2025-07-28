import axios from 'axios';
import axiosRetry from 'axios-retry';
import * as cheerio from 'cheerio';
import https from 'https';
import Article from '../models/Article.js';
import summarizerQueue from '../queues/aiQueue.js';

// Base URL and User-Agent pool
const baseUrl = 'https://techcrunch.com';
const agents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.1 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:45.0) Gecko/20100101 Firefox/45.0',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E304',
];

// Configure axios retries and timeouts
axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: error =>
    axiosRetry.isNetworkOrIdempotentRequestError(error) || error.code === 'ECONNRESET',
});

// HTTPS agent for keep‑alive connections
const httpsAgent = new https.Agent({ keepAlive: true, maxSockets: 10 });

async function scrapeTechCrunchNews() {
  try {
    console.log('🌐 Fetching TechCrunch homepage...');
    const { data: homeHtml } = await axios.get(baseUrl, {
      httpsAgent,
      headers: {
        'User-Agent': agents[Math.floor(Math.random() * agents.length)],
        'Accept': 'text/html,application/xhtml+xml,application/xml',
        'Accept-Language': 'en-US,en;q=0.9'
      },
      timeout: 10000
    });

    const $home = cheerio.load(homeHtml);
    const previews = [];

    // Gather article previews 🕵️‍♂️
    $home('li.wp-block-post').each((_, el) => {
      const linkEl = $home(el).find('.loop-card__title-link').first();
      const title = linkEl.text().trim();
      let url = linkEl.attr('href');
      if (!title || !url.endsWith('.html')) return;
      url = url.startsWith('http') ? url : baseUrl + url;

      // Extract image if present
      let image = null;
      const imgTag = $home(el).find('img[src]:not([src*="grey-placeholder"])').first();
      if (imgTag.length) {
        image = imgTag.attr('src') || imgTag.attr('data-src');
        if (image && image.startsWith('//')) image = 'https:' + image;
      }

      previews.push({ title, url, image, content: '' });
    });

    // Deduplicate 🗂️
    const seen = new Set();
    const articles = previews.filter(a => {
      if (seen.has(a.url)) return false;
      seen.add(a.url);
      return true;
    });
    console.log(`📰 Found ${articles.length} unique previews`);

    // Process each article sequentially 🚶‍♀️
    for (const article of articles) {
      try {
        // Skip if already stored 🔄
        if (await Article.exists({ url: article.url }) || await summarizerQueue.getJob(article.url)) continue;

        console.log(`📥 Fetching detail: ${article.url}`);
        const { data: detailHtml } = await axios.get(article.url, {
          httpsAgent,
          headers: {
            'User-Agent': agents[Math.floor(Math.random() * agents.length)]
          },
          timeout: 10000
        });
        const $$ = cheerio.load(detailHtml);

        // Extract content paragraphs 📝
        article.content = $$('p.wp-block-paragraph')
          .map((i, p) => $$(p).text().trim())
          .get()
          .filter(t => t.length > 30)
          .join('\n\n');

        // Fallback OG image 🌆
        if (!article.image) {
          const og = $$('meta[property="og:image"]').attr('content');
          if (og && og.startsWith('http')) article.image = og;
        }

        // Enqueue if valid ✅
        if (article.content && article.image) {
          await summarizerQueue.add(
            'summarize',
            { newArticle: { ...article, source: 'TechCrunch' } },
            {
              jobId: article.url,           // 🏷️ unique ID
              removeOnComplete: true,       // ✨ auto-clean
              removeOnFail: { age: 3600 }   // ⏳ cleanup failures
            }
          );
          console.log(`✅ Queued: ${article.url}`);
        } else {
          console.warn(`⚠️ Skipped incomplete: ${article.url}`);
        }
      } catch (err) {
        console.error(`❌ Error processing ${article.url}:`, err.message);
      }
    }

    console.log('🎉 TechCrunch scraping completed!');
  } catch (err) {
    console.error('🚨 Fetch error:', err.message);
  }
}

// Run immediately and every hour ⏰
scrapeTechCrunchNews();
setInterval(scrapeTechCrunchNews, 60 * 60 * 1000);

export default scrapeTechCrunchNews;
