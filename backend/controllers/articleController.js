import Article from "../models/Article.js";


async function getAllArticles(req, res) {
    try{
        const articles = await Article.find().sort({ createdAt: -1 });
        res.json(articles);
    }
    catch(err){
        console.log(err);
        res.status(500).json("Failed to get all articles");
    }
}
export default getAllArticles;