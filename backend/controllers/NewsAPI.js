import Redis from 'ioredis';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import axios from 'axios';
import pkg from 'newsapi';
const NewsAPI = pkg;

const newsapi = new NewsAPI('fe4ea707de3a4e1aa4b0d4470cea9940');

// ✅ Use ioredis for Upstash compatibility
const redisClient = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
  retryStrategy: (retries) => Math.min(retries * 50, 2000),
});

redisClient.on('error', (err) => {
  console.error('❌ Redis error:', err);
});

// No need for redisClient.connect() in ioredis — it's auto!
console.log('✅ ioredis client initialized');

// HANDLE SEARCH
export async function SearchHandler(req, res) {
  try {
    const query = req.query.userQuery;
    if (!query || !query.trim()) {
      return res.status(400).json({ error: "Query is required ❗" });
    }

    const searchTerm = query.toLowerCase().trim();
    const redisKey = `search:${searchTerm}`;

    // ✅ 1. Check Redis cache
    const cached = await redisClient.get(redisKey);
    if (cached) {
      console.log("🟢 Serving from Redis cache");
      return res.status(200).json(JSON.parse(cached));
    }

    // ✅ 2. If not cached, fetch from NewsAPI
    const response = await newsapi.v2.everything({
      q: searchTerm,
      language: "en",
      sortBy: "relevancy",
      pageSize: 30,
    });

    // ✅ 3. Cache the response for 1 hour (3600 seconds)
    await redisClient.setex(redisKey, 3600, JSON.stringify(response));

    console.log("🌐 Fetched from NewsAPI & cached");
    return res.status(200).json(response);

  } catch (err) {
    console.error("❌ Error in SearchHandler:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}
