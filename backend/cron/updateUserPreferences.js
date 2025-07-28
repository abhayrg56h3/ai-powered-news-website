import User from "../models/User.js";
import Article from "../models/Article.js";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

await mongoose.connect(process.env.MONGO_URI);



export default async function updateUserPreferences() {



  // console.log(`🔍 Found users to update preferences`);
  try {
    const users = await User.find({});
    

    for (const user of users) {
      const topicScores = {};
      const sourceScores = {};
      const regionScores = {};
      const now = Date.now();
      const decayLambda = 0.07;

      const recentViews = user.viewedArticles.slice(-50);
      const articleIds = recentViews.map((entry) => entry.articleId);
      const articles = await Article.find({ _id: { $in: articleIds } }).lean();
      const articleMap = Object.fromEntries(
        articles.map((a) => [a._id.toString(), a])
      );

      for (const entry of recentViews) {
        const articleId = entry.articleId;
        const viewMeta = typeof entry === "object" && entry.timeSpent != null ? entry : {};

        const article = articleMap[articleId.toString()];
        if (!article || !article.topic) continue;

        const viewedAt = viewMeta.viewedAt
          ? new Date(viewMeta.viewedAt).getTime()
          : now;
        const ageDays = Math.max((now - viewedAt) / (1000 * 60 * 60 * 24), 0);
        const decayWeight = Math.exp(-decayLambda * ageDays);

        let mult = 1;
        if (user.likedArticles.includes(articleId)) mult += 1;
        if (viewMeta.timeSpent && viewMeta.timeSpent > 60) mult += 0.5;

        const weight = decayWeight * mult;

        const topic = article.topic;
        const source = article.source;
        const region = article.region;
        topicScores[topic] = (topicScores[topic] || 0) + weight;
        if (source) sourceScores[source] = (sourceScores[source] || 0) + weight;
        regionScores[region] = (regionScores[region] || 0) + weight;
      }

      const topTopics = Object.entries(topicScores)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([topic]) => topic);

      const topSources = Object.entries(sourceScores)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([source]) => source);
      const topRegions = Object.entries(regionScores)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([region]) => region);

    
      let updatedUser=user;
     topTopics.forEach((topic) => {
        if (!updatedUser.preferences.topics.includes(topic)) {
          updatedUser.preferences.topics.push(topic);
        }
      }); 
      topSources.forEach((source) => {
        if (!updatedUser.preferences.sources.includes(source)) {
          updatedUser.preferences.sources.push(source);
        }
      });
      topRegions.forEach((region) => {
        if (!updatedUser.preferences.regions.includes(region)) {
          updatedUser.preferences.regions.push(region);
        }
      });


      await updatedUser.save();

      console.log(`✅ Updated ${user.email} preferences: ${topTopics.join(", ")}`);
    }

    console.log("🎉 Finished updating preferences for all users");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating user preferences:", error);
    process.exit(1);
  }
}


updateUserPreferences();
