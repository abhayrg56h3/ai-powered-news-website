import { Queue } from "bullmq";
import { Redis } from "ioredis";
import dotenv from 'dotenv';
dotenv.config();

// ✅ Redis connection using Upstash TCP URL
export const connection = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
  retryStrategy: (retries) => Math.min(retries * 50, 2000) // optional, handles disconnects
});

const summarizerQueue = new Queue("summarizerQueue", { connection });

export default summarizerQueue;
