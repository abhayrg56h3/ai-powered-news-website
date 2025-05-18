
import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
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
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
  topic: {
    type: String,
    default: '',
  },
  sentiment: {
    type: String,
    default: '',
  },
  publishedAt: {
    type: Date,
    default: null, 
  }

},
{ timestamps: true });


// Create the Expense model
const Article = mongoose.model("Article", ArticleSchema);

// Export the Expense model
export default Article;

