import { Router } from "express";
import  getAllArticles  from "../controllers/articleController.js";
const router = Router();



router.get("/articles", getAllArticles);

export {router as articlesRouter  };