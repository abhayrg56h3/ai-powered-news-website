import mongoose from "mongoose";

const BreakingNewsSchema = new mongoose.Schema(
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
    //   required: true,
    },
    region: {
      type: String,
      default: "",
    },
    breakingScore: {
      type: Number,
      default: 0, // you can calculate based on keywords + source
    },
  },
  { timestamps: true }
);

// Optional TTL index (auto-delete breaking news after X seconds)
BreakingNewsSchema.index({ createdAt: 1 }, { expireAfterSeconds: 259200 }); // 3 days

const BreakingNews = mongoose.model("BreakingNews", BreakingNewsSchema);

export default BreakingNews;
