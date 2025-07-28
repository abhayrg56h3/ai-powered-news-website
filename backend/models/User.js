import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: {
    type: String,
  },
  initial:{
    type:Boolean,
      default:true
  },


  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }], // saved articles
  likedArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }], // liked articles
  viewedArticles: [{
  articleId: { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
  viewedAt: { type: Date, default: Date.now },
  timeSpent: { type: Number, default: 0 } 
}],

 preferences: {
  topics: [String], 
  sources: [String], 
  regions:[String]
},
  profilePicture: {
    type: String,
  },
  resetPasswordToken: String,
resetPasswordExpires: Date

});

const User = mongoose.model("User", UserSchema);

export default User;
