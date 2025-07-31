import pLimit from 'p-limit';

// 🔒 Set a global concurrency limit across all scrapers
const globalLimiter = pLimit(2);

export default globalLimiter;
