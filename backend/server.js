// server.mjs or server.js with "type": "module" in package.json

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import scrapeTechCrunchNews from './scrapers/techcrunch.js';
import { articlesRouter } from './routes/articleRoutes.js';
import scrapeBBCNews from './scrapers/bbcScraper.js';
import scrapeAlJazeeraNews from './scrapers/aljazira.js';
// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use('/api', articlesRouter);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));




// scrapeBBCNews();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
