import Article from "../models/Article.js";
import Topic from "../models/Topic.js";
import Region from "../models/Region.js";
import Source from "../models/Source.js";
import User from "../models/User.js";
import { index } from "../utils/pineconeClient.js";
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

export async function getArticleMetadata() {
  const oneMonthAgo = new Date(Date.now() -  30 * 24 *  60 * 60 * 1000); // 👈 1 month ago

  try {
    const articles = await Article.find({ createdAt: { $lt: oneMonthAgo } }).select('topic region source _id');

    if (articles.length === 0) {
      console.log("✅ No old articles to delete.");
      process.exit(0);
    }

    await Promise.all(articles.map(async (article) => {
      const { _id, topic, region, source } = article;


      const updatedTopic = await Topic.findOneAndUpdate(
        { name: topic },
        { $inc: { articleCount: -1 } },
        { new: true }
      );
      if (updatedTopic?.articleCount <= 0) {
        await Topic.deleteOne({ name: topic });
      }


      const updatedRegion = await Region.findOneAndUpdate(
        { name: region },
        { $inc: { articleCount: -1 } },
        { new: true }
      );
      if (updatedRegion?.articleCount <= 0) {
        await Region.deleteOne({ name: region });
      }


      const updatedSource = await Source.findOneAndUpdate(
        { name: source },
        { $inc: { articleCount: -1 } },
        { new: true }
      );
      if (updatedSource?.articleCount <= 0) {
        await Source.deleteOne({ name: source });
      }


      await User.updateMany(
        { "viewedArticles.articleId": _id },
        { $pull: { viewedArticles: { articleId: _id } } }
      );
index.namespace("__default__").deleteOne(_id.toString()); 


 

      await Article.deleteOne({ _id });

      console.log(`✅ Article with ID ${_id} and metadata deleted.`);
    }));

    process.exit(0);
  } catch (err) {
    console.error("❌ Error deleting article metadata:", err);
    process.exit(1);
  }
}

getArticleMetadata();
