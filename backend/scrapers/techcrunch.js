import axios from 'axios';
import * as cheerio from 'cheerio';
import Article from '../models/Article.js';

const articles=[];
async function scrapeTechCrunchNews() {
     try{
         const response=await axios.get('https://www.techcrunch.com');
         const $=cheerio.load(response.data);
         const articles = [];

         // Target <li> elements with class wp-block-post
         $('li.wp-block-post').each((i, el) => {
           const title = $(el).find('.loop-card__title-link').text().trim();
           const url = $(el).find('.loop-card__title-link').attr('href');
           const source='TechCrunch';
        //    const date = $(el).find('.wp-block-post-date').text().trim();
        //    const excerpt = $(el).find('.wp-block-post-excerpt p').text().trim();
        //   console.log(title,url);


        
        let imageUrl = null;

        // Try to find a meaningful image (avoid placeholder)
        const $imageElement = $(el).find('img[src]:not([src*="grey-placeholder"])');

        if ($imageElement.length > 0) {
          // Prefer srcset if available for higher quality
          let srcset = $imageElement.attr('srcset');
          let src = $imageElement.attr('src');

          // Use srcset if present
        //   if (srcset) {
        //     // Extract largest image URL from srcset
        //     const urls = srcset.split(',').map(s => s.trim());
        //     const lastUrl = urls[urls.length - 1].split(' ')[0]; // Get last (highest resolution)
        //     imageUrl = lastUrl;
        //   } else {
            imageUrl = src;
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
                        const content=$$('p.wp-block-paragraph').text().trim();
                          
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
                        // console.log("article already exists",exists);
                    }
         });
     
        //  console.log(`Found ${articles.length} articles.`);
     }
     catch(error){
         console.error("message",error);
     }
}


scrapeTechCrunchNews();

setInterval(scrapeTechCrunchNews, 10 * 60 * 1000);

export default scrapeTechCrunchNews;
