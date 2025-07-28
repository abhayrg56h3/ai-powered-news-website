// backend/utils/algoliaClient.js
import algoliasearch from 'algoliasearch/lite';   // ← note the '/lite'!

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_KEY
);

const index = client.initIndex('news_website');
export default index;
