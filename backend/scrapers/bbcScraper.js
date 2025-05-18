import axios from 'axios';
import * as cheerio from 'cheerio';
import Article from '../models/Article.js';

async function scrapeBBCNews() {
  try {
    const response = await axios.get('https://www.bbc.com/news ');
    const html = response.data;
    const $ = cheerio.load(html);

    const articles = [];

    // Target article links more precisely
    $('a[data-testid="internal-link"]').each((i, element) => {
      const $link = $(element);
      const href = $link.attr('href');
      const titleElement = $link.find('h2');

      if (titleElement.length > 0) {
        const title = titleElement.text().trim();

        let link = href;
        if (!link.startsWith('http')) {
          link = 'https://www.bbc.com' + href;
        }

        // Improved image selection
      
        let imageUrl = null;

        // Try to find a meaningful image (avoid placeholder)
        const $imageElement = $(element).find('img[src]:not([src*="grey-placeholder"])');

        if ($imageElement.length > 0) {
          // Prefer srcset if available for higher quality
          let srcset = $imageElement.attr('srcset');
          let src = $imageElement.attr('src');

          // Use srcset if present
          if (srcset) {
            // Extract largest image URL from srcset
            const urls = srcset.split(',').map(s => s.trim());
            const lastUrl = urls[urls.length - 1].split(' ')[0]; // Get last (highest resolution)
            imageUrl = lastUrl;
          } else {
            imageUrl = src;
          }

          // Remove .webp extension if needed
          if (imageUrl?.endsWith('.webp')) {
            imageUrl = imageUrl.replace(/\.webp$/, '');
          }
        }
        // console.log(imageUrl);

        // Only add if title and image exist
        if (title) {
          articles.push({
            title,
            url: link,
            source: 'BBC',
            image: imageUrl,
          });
        }
      }
    });

    // console.log(`Found ${articles.length} articles`);




    // for(let article of articles) {
    //   const response=await axios.get(article.url);
    //   console.log(response);
    // }

    for (let article of articles) {
      const exists = await Article.findOne({ url: article.url });
      if (!exists) {
         const response=await axios.get(article.url);
         const $ = cheerio.load(response.data);
        
        
       const res=await axios.get(article.url);
       const $$ = cheerio.load(res.data);
       const textBlockDiv = $$('[data-component="text-block"]');
       const paragraphs = textBlockDiv.find('p');
       const newArticle=new Article({
           title: article.title,
           url: article.url,
           source: article.source,
           image: article.image,
           content: paragraphs.text().trim()
         });
         await newArticle.save();
        //  console.log(`Saved: ${article.title}`);
    
      } else {
        // console.log(`Skipped duplicate: ${article.title}`);
      }
    }


      //  const res=await axios.get(articles[0].url);
      //   // console.log(res);
      //   const $$ = cheerio.load(res.data);
      //   const textBlockDiv = $$('[data-component="text-block"]');
      //   const paragraphs = textBlockDiv.find('p');
        // console.log(paragraphs.text());


    // articles.map(async function(article) {
    //   //  console.log(article.url);
    //   //   const response= await axios.get(article.url);
    //   //   console.log(response);
    // });

  } catch (error) {
    console.error('Error scraping BBC:', error.message);
  }
}

scrapeBBCNews();
setInterval(scrapeBBCNews,  10*60 * 1000);

export default scrapeBBCNews;