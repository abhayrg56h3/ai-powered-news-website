import axios from 'axios';
import * as cheerio from 'cheerio';
import Article from '../models/Article.js';

const articles=[];
async function scrapeAlJazeeraNews() {
    const baseUrl = 'https://www.aljazeera.com';
     try{
         const response=await axios.get('https://www.aljazeera.com/news/');
         const $=cheerio.load(response.data);
         const articles = [];

         // Target <li> elements with class wp-block-post
         $('article.u-clickable-card').each((i, el) => {
           const title = $(el).find('.u-clickable-card__link').find('span').text().trim();
           let url = $(el).find('.u-clickable-card__link').attr('href');
           url=baseUrl + url;
           const source="AlJazeera";
        //    const date = $(el).find('.wp-block-post-date').text().trim();
        //    const excerpt = $(el).find('.wp-block-post-excerpt p').text().trim();
        //   console.log(url);


        
        let imageUrl = null;

        // Try to find a meaningful image (avoid placeholder)
        const $imageElement = $(el).find('img[src]:not([src*="grey-placeholder"])');

        if ($imageElement.length > 0) {
            
          // Prefer srcset if available for higher quality
          let srcset = $imageElement.attr('srcset');
        //   let src = $imageElement.attr('src');
        //   console.log('Found image:',src);
          // Use srcset if present
        //   if (srcset) {
        //     // Extract largest image URL from srcset
        //     const urls = srcset.split(',').map(s => s.trim());
        //     const lastUrl = urls[urls.length - 1].split(' ')[0]; // Get last (highest resolution)
        //     imageUrl = lastUrl;
        //   } else {
            imageUrl = baseUrl + $imageElement.attr('src');
        //   }

          // Remove .webp extension if needed
        //   if (imageUrl?.endsWith('.webp')) {
        //     imageUrl = imageUrl.replace(/\.webp$/, '');
        //   }
        }
        // console.log(imageUrl,title);
           articles.push({
             title,
             url,
             source,
             image:imageUrl,
           });
         });

         console.log(`Found ${articles.length} articles`);

         articles.map(async function(article){
                    const exists=await Article.findOne({url:article.url});
                    if(!exists){
                       
                        const res=await axios.get(article.url);
                        const $$=cheerio.load(res.data);
                        const content=$$('#main-content-area').find('p').text().trim();
                          
                        const newArticle=new Article({
                            title:article.title,
                            url:article.url,
                            source:article.source,
                            image:article.image,
                            content:content,
                        });
                        await newArticle.save();
                        // console.log("new article saved",newArticle);
                    }
                    else{
                        console.log(article.image);
                        // console.log("article already exists",exists);
                    }
         });
     
         console.log(`Found ${articles.length} articles.`);
     }
     catch(error){
         console.error("message",error);
     }
}


scrapeAlJazeeraNews();

setInterval(scrapeAlJazeeraNews, 10 * 60 * 1000);

export default scrapeAlJazeeraNews;
