import mongoose from "mongoose";
const UserArticleInteractionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  articleId: { type: mongoose.Schema.Types.ObjectId, ref: "Article", required: true },
  interactionType: { type: String, enum: ["viewed", "liked", "shared"], required: true },
  timeSpent: { type: Number, default: 0 }, // seconds
  createdAt: { type: Date, default: Date.now }
});

const UserArticleInteraction = mongoose.model("UserArticleInteraction", UserArticleInteractionSchema);
export default UserArticleInteraction;
