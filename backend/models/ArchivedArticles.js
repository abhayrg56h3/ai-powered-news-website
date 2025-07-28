import mongoose from "mongoose";

const ArchivedArticleSchema = new mongoose.Schema(
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
    originalType: {
      type: String,
      enum: ["breaking", "trending", "general"],
      default: "general",
    },
  },
  { timestamps: true }
);

const ArchivedArticle = mongoose.model("ArchivedArticle", ArchivedArticleSchema);

export default ArchivedArticle;
