import 'dotenv/config';
import { Pinecone } from '@pinecone-database/pinecone';

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
  controllerHostUrl: process.env.PINECONE_HOST,
});

export const index = pinecone.index(process.env.PINECONE_INDEX_NAME);



