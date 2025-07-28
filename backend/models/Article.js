import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    breakingScore: {
      type: Number,

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

    embedding: {
      type: [Number], // Array of floats
      default: []
    },
    tags: {
      type: [String], // Array of floats
      default: []
    },
    views: {
      type: Number,
      default: 0
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    region: {
      type: String,
      default: "",
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },


  { timestamps: true }
);

// Create the Expense model
const Article = mongoose.model("Article", ArticleSchema);

// Export the Expense model
export default Article;
