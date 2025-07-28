import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // ensures no duplicate topics
      trim: true,
    },
    icon: {
      type: String,
      default: "📰", // you can use icons like 📱 for tech, 🧠 for AI etc.
    },
    priority: {
      type: Number,
      default: 0, // use to control sorting in dropdown/filter
    },
    articleCount: {
      type: Number,
      default: 0, // increment when articles are added under this topic
    },
  },
  { timestamps: true }
);

const Topic = mongoose.model("Topic", TopicSchema);
export default Topic;
