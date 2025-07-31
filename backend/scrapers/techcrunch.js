// scrapeTechCrunch.js
import axios from 'axios';
import axiosRetry from 'axios-retry';
import * as cheerio from 'cheerio';
import https from 'https';
import Article from '../models/Article.js';
import summarizerQueue from '../queues/aiQueue.js';
import Redis from 'ioredis';
import Url from '../models/Url.js';

// ─── User‑Agent Pool ────────────────────────────────────────────────────────────
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
  // Fix protocol-relative URLs
  if (url.startsWith('//')) url = 'https:' + url;
  // Fix relative paths
  if (url.startsWith('/')) {
    // Ensure we don't have extra spaces in the base URL
    url = 'https://techcrunch.com' + url;
  }
  // Remove query parameters that cause 404s
  url = url.split('?')[0].trim();
  // Additional cleanup for common issues
  url = url.replace(/\/{2,}/g, '/').replace(':/', '://');
  return url;
}

// ─── Helper: Extract best featured image ────────────────────────────────────────
function extractFeaturedImage($) {
  // 1. Try structured data (JSON-LD) - most reliable source for canonical image
  const ldJsonScripts = $('script[type="application/ld+json"]');
  for (const el of ldJsonScripts.toArray()) {
    try {
      const data = JSON.parse($(el).html());
      // Handle graph structure
      if (data['@graph']) {
        for (const item of Array.isArray(data['@graph']) ? data['@graph'] : [data]) {
          // Look for Article or NewsArticle with image
          if ((item['@type'] === 'Article' || item['@type'] === 'NewsArticle') && item.image) {
            if (typeof item.image === 'string') return cleanImageUrl(item.image);
            if (item.image.url) return cleanImageUrl(item.image.url);
            if (Array.isArray(item.image) && item.image.length > 0) {
              return cleanImageUrl(typeof item.image[0] === 'string' ? item.image[0] : item.image[0].url);
            }
          }
          // Look for ImageObject
          if (item['@type'] === 'ImageObject' && item.contentUrl) {
            return cleanImageUrl(item.contentUrl);
          }
        }
      } 
      // Handle standard structure
      else if (data.image) {
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
  // 2. Try og:image meta tag
  const ogImage = $('meta[property="og:image"]').attr('content') || 
                 $('meta[name="og:image"]').attr('content');
  if (ogImage) return cleanImageUrl(ogImage);
  // 3. Try twitter:image meta tag
  const twitterImage = $('meta[name="twitter:image"]').attr('content');
  if (twitterImage) return cleanImageUrl(twitterImage);
  // 4. Try to find highest resolution from srcset
  const $mainImage = $('figure.wp-block-post-featured-image img, .article-content img, .post-content img, .loop-card__figure img').first();
  const srcset = $mainImage.attr('srcset') || $mainImage.attr('data-srcset');
  if (srcset) {
    // Parse srcset into URLs and widths
    const urls = srcset.split(',').map(s => {
      const parts = s.trim().split(/\s+/);
      const url = parts[0];
      const width = parts.length > 1 ? parseInt(parts[1]) : 0;
      return { url, width: width || 0 };
    }).filter(item => item.url);
    // Sort by width (largest first) and return the largest
    if (urls.length > 0) {
      urls.sort((a, b) => b.width - a.width);
      return cleanImageUrl(urls[0].url);
    }
  }
  // 5. Fallback to direct src attributes
  const directSrc = $mainImage.attr('data-src') || 
                   $mainImage.attr('src') ||
                   $('meta[property="og:image"]').attr('content') ||
                   $('link[rel="image_src"]').attr('href');
  if (directSrc) return cleanImageUrl(directSrc);
  // 6. Last resort: look for any image in the article
  const anyImage = $('article img, .post-content img').first().attr('src') ||
                  $('article img, .post-content img').first().attr('data-src');
  return anyImage ? cleanImageUrl(anyImage) : '';
}

// ─── Fetch previews via HTML ───────────────────────────────────────────────────
async function fetchPreviewsFromHTML() {
  const { data } = await axios.get(HTML_URL, {
    httpsAgent,
    headers: { 'User-Agent': agents[Math.random() * agents.length | 0] },
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
    // Find title and URL
    const linkEl = $el.find('a.post-block__title__link, h2.post-title a, h3.loop-card__title a')
      .first();
    const title = linkEl.text().trim();
    let url = linkEl.attr('href') || '';
    // Skip if no title or invalid URL pattern
    if (!title || !url) return;
    // Clean and normalize URL
    if (!url.startsWith('http')) {
      if (url.startsWith('/')) {
        url = 'https://techcrunch.com' + url;
      } else {
        url = 'https://techcrunch.com/' + url;
      }
    }
    // Extract image from this preview element
    let img = '';
    // Try to find image in this block
    const imgEl = $el.find('img.wp-post-image, img.attachment-card-block-16x9, figure img').first();
    if (imgEl.length) {
      img = imgEl.attr('data-src') || imgEl.attr('src') || '';
      // Handle srcset if available
      const srcset = imgEl.attr('srcset');
      if (srcset) {
        const urls = srcset.split(',').map(s => s.trim().split(/\s+/)[0]);
        if (urls.length > 0) img = urls[0];
      }
      // Clean image URL
      img = cleanImageUrl(img);
    }
    previews.push({ title, url, image: img, content: '' });
  });
  return previews;
}

// ─── Fetch previews via RSS ────────────────────────────────────────────────────
async function fetchPreviewsFromRSS() {
  const { data } = await axios.get(RSS_URL, {
    headers: { 'User-Agent': agents[Math.random() * agents.length | 0] },
    timeout: 10000,
  });
  const $ = cheerio.load(data, { xmlMode: true });
  const previews = [];
  $('item').each((_, el) => {
    const title = $(el).find('title').text().trim();
    let url = $(el).find('link').text().trim();
    const img = $(el).find('media\\:content, media\\:thumbnail, enclosure').attr('url') || '';
    // Clean URL
    if (url && !url.startsWith('http')) {
      url = 'https://techcrunch.com' + url;
    }
    if (title && url) previews.push({ title, url, image: cleanImageUrl(img), content: '' });
  });
  return previews;
}

// ─── Main scraper ───────────────────────────────────────────────────────────────
async function scrapeTechCrunch() {
  console.log('🌐 Fetching previews from TechCrunch…');
  let previews = [];
  try {
    previews = await fetchPreviewsFromHTML();
    console.log(`📰 Got ${previews.length} previews from HTML`);
  } catch (htmlError) {
    console.warn('⚠️ Error fetching HTML previews:', htmlError.message);
    try {
      console.warn('⚠️ Falling back to RSS feed…');
      previews = await fetchPreviewsFromRSS();
      console.log(`📰 Got ${previews.length} previews from RSS`);
    } catch (rssError) {
      console.error('❌ Failed to fetch from both HTML and RSS:', rssError.message);
      return;
    }
  }
  if (previews.length === 0) {
    console.warn('⚠️ No previews found from either source');
    return;
  }
  
  // FIXED: Changed from newArticles to previews (bug #1)
  for (const art of previews) {
    try {
      if (await Url.exists({ url: art.url }) || await Article.exists({ url: art.url })) continue;
      console.log(`📥 Fetching detail: ${art.url}`);
      const { data: html } = await axios.get(art.url, {
        httpsAgent,
        headers: { 'User-Agent': agents[Math.random() * agents.length | 0] },
        timeout: 15000,
      });
      const $ = cheerio.load(html);
      // 🔍 Extract full text
      const paras = [];
      $('article.post article, div.article-content, div.post-content, div.wp-block-post-content').each((_, content) => {
        const $content = $(content);
        $content.find('p, .wp-block-paragraph').each((i, p) => {
          const t = $(p).text().trim();
          if (t.length > 30) paras.push(t);
        });
      });
      // If we didn't find content with the above selectors, try a more general approach
      if (paras.length < 3) {
        $('article p, .entry-content p, .post-body p').each((i, p) => {
          const t = $(p).text().trim();
          if (t.length > 30) paras.push(t);
        });
      }
     
      art.content = paras.join('\n');
      // 🖼️ Extract featured image using our robust method
      art.image = extractFeaturedImage($);
      console.log('🖼️ Image URL:', art.image);
      console.log('📄 Content length:', art.content.length);
      // ✅ Queue if valid
      if (art.content && art.content.length > 100 && art.image) {
        const newUrl = new Url({
          url: art.url
        });
        await newUrl.save();
        await summarizerQueue.add('summarize', {
          newArticle: { ...art, source: 'TechCrunch' }
        });
        console.log('🔔 Queued for summarization!');
      } else {
        console.warn(`⚠️ Skipped incomplete article: ${art.url}`);
        if (!art.content || art.content.length < 100) console.warn('⚠️ Content too short');
        if (!art.image) console.warn('⚠️ No image found');
      }
    } catch (e) {
      console.error(`❌ Error fetching detail for ${art.url}:`, e.message);
    }
  }
  console.log('🎉 Scrape finished!');
}
export default scrapeTechCrunch;