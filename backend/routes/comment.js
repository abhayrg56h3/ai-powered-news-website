import { Router } from "express";
import { getFullComment } from "../controllers/CommentController.js";
import { saveComment } from "../controllers/CommentController.js";
import { deleteComment } from "../controllers/CommentController.js";
const router = Router();


 

 router.get('/getfullcomment/:id',getFullComment);
 router.post('/savecomment',saveComment);
    router.delete('/deletecomment/:id',deleteComment);



export {router as commentRouter  };