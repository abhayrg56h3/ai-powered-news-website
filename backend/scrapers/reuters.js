import axios from 'axios';
import * as cheerio from 'cheerio';
import path from 'path';
import { fileURLToPath } from 'url';
import summarizerQueue from '../queues/aiQueue.js'; // Adjust path as needed

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🌐 Base URL of Reuters homepage
const baseUrl = 'https://www.reuters.com/';

/**
 * 🧠 Main Scraper Function for Reuters
 */
async function reutersNews() {
  const allArticles = [];

  try {
    console.log('🛰️ Fetching Reuters homepage...');
    const { data } = await axios.get(baseUrl);
    const $ = cheerio.load(data);

    // 🔍 Find article previews (based on uploaded homepage)
    $('a[data-testid="Heading"]').each((_, el) => {
      let title = $(el).text().trim();
      let url = $(el).attr('href');
      let image = $(el).closest('article').find('img').attr('src') || null;

      if (!url || !title) return;

      if (!url.startsWith('http')) {
        url = new URL(url, baseUrl).href;
      }

      allArticles.push({
        title,
        url,
        image,
        content: ''
      });
    });

    console.log(`📰 Found ${allArticles.length} article previews`);

    // 🧠 Extract content from individual articles
    await Promise.all(
      allArticles.map(async (article) => {
        try {
          console.log(`📥 Fetching full article: ${article.title}`);
          const { data } = await axios.get(article.url);
          const $$ = cheerio.load(data);

          // 📄 Extract paragraphs based on uploaded content page
          const paras = $$('article p')
            .map((_, el) => $$(el).text().trim())
            .get()
            .filter((txt) => txt.length > 30);

          article.content = paras.join(' ');

          const newArticle = {
            title: article.title,
            url: article.url,
            source: 'Reuters',
            image: article.image,
            content: article.content
          };

          const job = await summarizerQueue.add('summarize', { newArticle });
          console.log(`✅ Queued summarization job ${job.id}`);

        } catch (err) {
          console.error(`❌ Error fetching article: ${article.url}`, err.message);
        }
      })
    );

    console.log('🎯 Reuters scraping completed!');

  } catch (error) {
    console.error('🚨 Network or parsing error:', error.message);
  }
}

// 🕒 Run every 10 minutes
reutersNews();
setInterval(reutersNews, 10 * 60 * 1000);

export default reutersNews;
