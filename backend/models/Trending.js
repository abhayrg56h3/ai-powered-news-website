import mongoose from "mongoose";

const TrendingArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
    source: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    topic: {
      type: String,
      default: "",
    },
    sentiment: {
      type: String,
      default: "",
    },
    publishedAt: {
      type: Date,
      required: true,
    },
    region: {
      type: String,
      default: "",
    },
    trendingScore: {
      type: Number,
      default: 0, // Based on duplication, engagement, etc.
    },
  },
  { timestamps: true }
);

// Optional: Auto-delete after 7 days (604800 seconds)
TrendingArticleSchema.index({ createdAt: 1 }, { expireAfterSeconds: 604800 });

const TrendingArticle = mongoose.model("TrendingArticle", TrendingArticleSchema);

export default TrendingArticle;
