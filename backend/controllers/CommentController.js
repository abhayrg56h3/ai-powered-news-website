import Comment from "../models/Comment.js";
import Article from "../models/Article.js";


// GET FULL COMMENT OBJECT
export async function getFullComment(req,res){
           try{
              const id=req.params.id;
              
     const response=await Comment.findById(id);
              res.status(200).json(response);
           }
           catch(err){
  res.status(500).json(err);
           }
}


//  SAVE A COMMENT

export async function saveComment(req,res){
      // console.log(req.body);
           try{
       const newComment=Comment(req.body);
       
 const response= await newComment.save();
await Article.findByIdAndUpdate(
  response.articleId,
  { $push: { comments: response._id } },
  { new: true }
);

 console.log(response);
              res.status(200).json(response);
           }
           catch(err){
            console.log(err);
  res.status(500).json(err);
           }
}


// DELETE A COMMENT
export async function deleteComment(req,res){
   try{
       const id=req.params.id;
       const response=await Comment.findByIdAndDelete(id);
       await Article.findByIdAndUpdate(
           response.articleId,
           { $pull: { comments: response._id } },
           { new: true }
       );
       res.status(200).json(response);
   }
   catch(err){
       console.log(err);
       res.status(500).json(err);
   }
}