import mongoose from "mongoose";





const CommentSchema = new mongoose.Schema({
  articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  userProfilePic:{type:String},
  userName:{type:String, required:true}
},{timestamps:true});

// Create the Region model
const Comment = mongoose.model("Comment", CommentSchema);

// Export the model
export default Comment;
