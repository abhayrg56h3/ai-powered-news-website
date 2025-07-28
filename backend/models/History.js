import mongoose from "mongoose";

const SeenArticleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seenArticles: [
      {
        article: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Article",
          required: true,
        },
        seenAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const SeenArticleHistory = mongoose.model("SeenArticleHistory", SeenArticleSchema);

export default SeenArticleHistory;