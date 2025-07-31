// scrapeTechCrunch.js
import axios from 'axios';
import axiosRetry from 'axios-retry';
import * as cheerio from 'cheerio';
import https from 'https';
import Article from '../models/Article.js';
import summarizerQueue from '../queues/aiQueue.js';
import Redis from 'ioredis';
import Url from '../models/Url.js';
import pLimit from 'p-limit';
import globalLimiter from '../utils/limiter.js';

const limit = pLimit(5);

// ─── User-Agent Pool ────────────────────────────────────────────────────────────
const agents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.1 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:45.0) Gecko/20100101 Firefox/45.0',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E304',
];

// ─── Axios config ───────────────────────────────────────────────────────────────
axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: e =>
    axiosRetry.isNetworkOrIdempotentRequestError(e) || e.code === 'ECONNRESET',
});

const httpsAgent = new https.Agent({ keepAlive: true, maxSockets: 10 });

// ─── Sources ───────────────────────────────────────────────────────────────────
const HTML_URL = 'https://techcrunch.com/latest/';
const RSS_URL  = 'https://feeds.feedburner.com/TechCrunch/';

// ─── Helper: Clean and normalize image URL ──────────────────────────────────────
function cleanImageUrl(url) {
  if (!url) return '';
  if (url.startsWith('//')) url = 'https:' + url;
  if (url.startsWith('/')) url = 'https://techcrunch.com' + url;
  url = url.split('?')[0].trim();
  url = url.replace(/\/{2,}/g, '/').replace(':/', '://');
  return url;
}

// ─── Helper: Extract best featured image ────────────────────────────────────────
function extractFeaturedImage($) {
  const ldJsonScripts = $('script[type="application/ld+json"]');
  for (const el of ldJsonScripts.toArray()) {
    try {
      const data = JSON.parse($(el).html());
      if (data['@graph']) {
        for (const item of Array.isArray(data['@graph']) ? data['@graph'] : [data]) {
          if ((item['@type'] === 'Article' || item['@type'] === 'NewsArticle') && item.image) {
            if (typeof item.image === 'string') return cleanImageUrl(item.image);
            if (item.image.url) return cleanImageUrl(item.image.url);
            if (Array.isArray(item.image) && item.image.length > 0) {
              return cleanImageUrl(typeof item.image[0] === 'string' ? item.image[0] : item.image[0].url);
            }
          }
          if (item['@type'] === 'ImageObject' && item.contentUrl) {
            return cleanImageUrl(item.contentUrl);
          }
        }
      } else if (data.image) {
        if (typeof data.image === 'string') return cleanImageUrl(data.image);
        if (data.image.url) return cleanImageUrl(data.image.url);
        if (Array.isArray(data.image) && data.image.length > 0) {
          return cleanImageUrl(typeof data.image[0] === 'string' ? data.image[0] : data.image[0].url);
        }
      }
    } catch (e) {
      continue;
    }
  }

  const ogImage = $('meta[property="og:image"]').attr('content') ||
                  $('meta[name="og:image"]').attr('content');
  if (ogImage) return cleanImageUrl(ogImage);

  const twitterImage = $('meta[name="twitter:image"]').attr('content');
  if (twitterImage) return cleanImageUrl(twitterImage);

  const $mainImage = $('figure.wp-block-post-featured-image img, .article-content img, .post-content img, .loop-card__figure img').first();
  const srcset = $mainImage.attr('srcset') || $mainImage.attr('data-srcset');
  if (srcset) {
    const urls = srcset.split(',').map(s => {
      const parts = s.trim().split(/\s+/);
      return { url: parts[0], width: parts[1] ? parseInt(parts[1]) : 0 };
    }).filter(item => item.url);
    if (urls.length) {
      urls.sort((a, b) => b.width - a.width);
      return cleanImageUrl(urls[0].url);
    }
  }

  const directSrc = $mainImage.attr('data-src') ||
                    $mainImage.attr('src') ||
                    $('link[rel="image_src"]').attr('href');
  if (directSrc) return cleanImageUrl(directSrc);

  const anyImage = $('article img, .post-content img').first().attr('src') ||
                   $('article img, .post-content img').first().attr('data-src');
  return anyImage ? cleanImageUrl(anyImage) : '';
}

// ─── Fetch previews via HTML ───────────────────────────────────────────────────
async function fetchPreviewsFromHTML() {
  const { data } = await axios.get(HTML_URL, {
    httpsAgent,
    headers: { 'User-Agent': agents[Math.floor(Math.random() * agents.length)] },
    timeout: 10000,
  });
  const $ = cheerio.load(data);
  const previews = [];
  const blocks = $('div.river .post-block')
    .add('article.post-block')
    .add('div.latest-stories article')
    .add('li.wp-block-post');

  blocks.each((_, el) => {
    const $el = $(el);
    const linkEl = $el.find('a.post-block__title__link, h2.post-title a, h3.loop-card__title a').first();
    let url = linkEl.attr('href') || '';
    const title = linkEl.text().trim();
    if (!title || !url) return;
    if (!url.startsWith('http')) {
      url = url.startsWith('/') ? `https://techcrunch.com${url}` : `https://techcrunch.com/${url}`;
    }
    let img = '';
    const imgEl = $el.find('img.wp-post-image, img.attachment-card-block-16x9, figure img').first();
    if (imgEl.length) {
      img = imgEl.attr('data-src') || imgEl.attr('src') || '';
      const srcset = imgEl.attr('srcset');
      if (srcset) {
        const urls = srcset.split(',').map(s => s.trim().split(/\s+/)[0]);
        if (urls.length) img = urls[0];
      }
      img = cleanImageUrl(img);
    }
    previews.push({ title, url, image: img, content: '' });
  });

  return previews;
}

// ─── Fetch previews via RSS ────────────────────────────────────────────────────
async function fetchPreviewsFromRSS() {
  const { data } = await axios.get(RSS_URL, {
    headers: { 'User-Agent': agents[Math.floor(Math.random() * agents.length)] },
    timeout: 10000,
  });
  const $ = cheerio.load(data, { xmlMode: true });
  const previews = [];

  $('item').each((_, el) => {
    const title = $(el).find('title').text().trim();
    let url = $(el).find('link').text().trim();
    const img = $(el).find('media\\:content, media\\:thumbnail, enclosure').attr('url') || '';
    if (url && !url.startsWith('http')) url = `https://techcrunch.com${url}`;
    if (title && url) previews.push({ title, url, image: cleanImageUrl(img), content: '' });
  });

  return previews;
}

// ─── Main scraper ───────────────────────────────────────────────────────────────
async function scrapeTechCrunch() {
  let previews = [];
  try {
    previews = await fetchPreviewsFromHTML();
  } catch (htmlError) {
    try {
      previews = await fetchPreviewsFromRSS();
    } catch {
      return;
    }
  }
  if (!previews.length) return;

  const tasks = previews.map(art =>
    globalLimiter(async () => {
      try {
        if (await Url.exists({ url: art.url }) || await Article.exists({ url: art.url })) return;

        const { data: html } = await axios.get(art.url, {
          httpsAgent,
          headers: { 'User-Agent': agents[Math.floor(Math.random() * agents.length)] },
          timeout: 15000,
        });
        const $ = cheerio.load(html);

        const paras = [];
        $('article.post article, div.article-content, div.post-content, div.wp-block-post-content')
          .each((_, content) => {
            $(content).find('p, .wp-block-paragraph').each((i, p) => {
              const t = $(p).text().trim();
              if (t.length > 30) paras.push(t);
            });
          });
        if (paras.length < 3) {
          $('article p, .entry-content p, .post-body p').each((i, p) => {
            const t = $(p).text().trim();
            if (t.length > 30) paras.push(t);
          });
        }
        art.content = paras.join('\n');

        art.image = extractFeaturedImage($);

        // 🔥 Free memory by tearing down the DOM
        $.root().remove();
        
  
        console.log('🖼️ Image URL:', art.image);
        console.log('📄 Content length:', art.content.length);
        if (art.content && art.content.length > 100 && art.image) {
          await new Url({ url: art.url }).save();
          await summarizerQueue.add('summarize', { newArticle: { ...art, source: 'TechCrunch' } });
        }
      } catch {
        // suppressed
      }
    })
  );

  await Promise.all(tasks);
}

export default scrapeTechCrunch;
