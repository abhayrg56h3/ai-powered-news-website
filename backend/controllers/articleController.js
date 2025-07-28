import Article from "../models/Article.js";
import User from "../models/User.js";
import BreakingNews from "../models/BreakingNews.js";
import Comment from "../models/Comment.js";
import Topic from "../models/Topic.js";
import Source from "../models/Source.js";
import Region from "../models/Region.js";
import { index } from "../utils/pineconeClient.js";
import { initModel } from "../ai-services/summarizer.js";
import { console } from "inspector";
const topicsList = ["News", "Politics", "Government", "Society", "Culture", "Science", "Technology", "Health", "Education", "Environment", "Economy", "Business", "Finance", "Law", "Crime", "Religion", "Philosophy", "History", "Art", "Media", "Entertainment", "Sports", "Lifestyle", "Travel", "Food", "Fashion", "Beauty", "Parenting", "Relationships", "Psychology", "Self-Improvement", "Animals", "Agriculture", "Energy", "Infrastructure", "Transportation", "Space", "Climate", "Startups", "War", "Peace", "Diplomacy", "Gender", "LGBTQ+", "Race", "Immigration", "Democracy", "Human Rights", "Activism", "Censorship", "Digital Media", "Internet", "Cybersecurity", "Social Media", "Marketing", "Advertising", "Innovation", "Careers", "Work", "Remote Work", "Real Estate", "Stock Market", "Cryptocurrency", "Banking", "Taxes", "Consumerism", "Big Tech", "Data", "Privacy", "Engineering", "Mathematics", "Physics", "Chemistry", "Biology", "Astronomy", "Pharmaceuticals", "Mental Health", "Fitness", "Nutrition", "Diseases", "Pandemics", "Vaccines", "Wellness", "Spirituality", "Justice", "Freedom", "Equality", "Traditions", "Languages", "Literature", "Books", "Film", "Television", "Music", "Dance", "Theatre", "Museums", "Photography", "Architecture", "Design", "Sustainability", "Pollution", "Natural Disasters", "Forests", "Oceans", "Wildlife", "Recycling", "Water", "Electricity", "Aviation", "Railways", "Shipping", "Space Exploration", "International Relations", "Global Organizations", "Public Policy", "Urban Development", "Rural Development", "Security", "Law Enforcement", "Judiciary", "Constitution", "Freedom of Speech", "Nationalism", "Secularism", "Genetics", "Bioethics", "Online Education", "Research", "Universities", "Schools", "Aging", "Inclusion", "Home & Living", "Minimalism", "Hobbies", "Festivals", "Holidays", "Mythology", "Local News", "Regional News", "Global News", "Opinion", "Investigative Journalism"];
// GET ALL ARTICLES
export async function getAllArticles(req, res) {
  const source = req.query.sources;
  const topic = req.query.topics;
  const region = req.query.regions;
  const sentiment = req.query.sentiment;
  const startingDate = req.query.startingDate;
  const endDate = req.query.endDate;

  const filter = {};

  if (source) {
    filter.source = { $in: source.split(",") };
  }
  if (topic) {
    filter.topic = { $in: topic.split(",") };
  }
  if (region) {
    filter.region = { $in: region.split(",") };
  }
  if (sentiment) {
    filter.sentiment = sentiment;
  }
  if (startingDate || endDate) {
    filter.createdAt = {}; // or use your field name, e.g., `date`

    if (startingDate) {
      filter.createdAt.$gte = new Date(startingDate);
    }
    if (endDate) {
      filter.createdAt.$lte = new Date(endDate);
    }
  }

  console.log(filter);

  try {
    const articles = await Article.find(filter).sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    console.log(err);
    res.status(500).json("Failed to get all articles");
  }
}




//GET ARTICLE BY ID
export async function getById(req, res) {



  const { id } = req.params;
  console.log("Fetching article with ID:", id);




  try {
    const article = await Article.findById(id);

    // if (!article) {
    //   return res.status(404).json({ message: "Article not found" });
    // }

    return res.status(200).json(article);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

// GET BREAKING ARTICLES

export async function getBreakingArticles(req, res) {
  try {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    const articles = await Article.find({ breakingScore: { $gte: 90 }, createdAt: { $gte: threeDaysAgo } })
      .sort({ breakingScore: -1, createdAt: -1 })
      .limit(10);
    res.json(articles);
  } catch (err) {
    console.log(err);
    res.status(500).json("Failed to get breaking articles");
  }
}

// SAVE FAVOURITE ARTICLES

export async function saveFavoriteArticles(req, res) {

  console.log(req.body);

  try {
    const id = req.query.id;
    const userId = req.query.userId;
    const user = await User.findById(userId);
    console.log("USERID YEH HAI", id);

    if (!user) {
      return res.status(404).json({ message: "User not found! ❌" });
    }

    // console.log(user);

    let updateOp;

    if (user.favorites.includes(id)) {
      updateOp = { $pull: { favorites: id } };
    } else {
      updateOp = { $addToSet: { favorites: id } };
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateOp, {
      new: true,
    });

    console.log(updatedUser);

    res.status(200).json({
      message: "Article added to favorites! ⭐",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error 😞" });
  }
}

// LIKE ARTICLE

export async function LikeArticle(req, res) {
  try {
    const id = req.query.id;
    const userId = req.query.userId;
    const user = await User.findById(userId);
    const article = await Article.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found! ❌" });
    }

    let updateOp;
    let updateOp2;

    if (user.likedArticles.includes(id)) {
      updateOp = { $pull: { likedArticles: id } };
    } else {
      updateOp = { $addToSet: { likedArticles: id } };
    }

    if (article.likes.includes(userId)) {
      updateOp2 = { $pull: { likes: userId } };
    } else {
      updateOp2 = { $addToSet: { likes: userId } };
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateOp, {
      new: true,
    });
    await Article.findByIdAndUpdate(id, updateOp2);

    res.status(200).json({
      message: "Article added to likes! ⭐",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error 😞" });
  }
}





// POST COMMENT

export async function postComment(req, res) {



  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ message: "Missing articleId or comment ❗" });
    }

    const newComment = new Comment(req.body);

    const savedComment = await newComment.save();
    console.log(savedComment);
    await Article.findByIdAndUpdate(req.body.articleId, {
      $addToSet: { comments: savedComment._id },
    });
    res.status(200).json({
      message: "Comment Added Successfully⭐",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

// FETCH ARTICLE BY TOPIC

export async function fetchByTopic(req, res) {
  try {
    const topic = req.body.topic;
    const page = parseInt(req.body.page);
    const limit = 8; // Set your desired limit
    const totalArticles = await Article.countDocuments({ topic });
  const response = await Article.find({ topic })
  .sort({createdAt:-1})
  .skip((page - 1) * limit)                   
  .limit(limit); 


    res.status(200).json({ articles:response, totalPages: Math.ceil(totalArticles / limit) });
  } catch (err) {
    console.error("❌ Aggregation Error:", err);
    res.status(500).json({ error: err.message });
  }
}

// FETCH ARTICLE BY SOURCE

export async function fetchBySource(req, res) {
  try {
    const source = req.body.source;
    const page = parseInt(req.body.page);
    const limit = 8; // Set your desired limit
     const totalArticles = await Article.countDocuments({ source});
   const response = await Article.find({ source })
   .sort({createdAt:-1})
  .skip((page - 1) * limit)                   
  .limit(limit); 


     res.status(200).json({ articles:response, totalPages: Math.ceil(totalArticles / limit) });
  } catch (err) {
    console.error("❌ Aggregation Error:", err);
    res.status(500).json({ error: err.message });
  }
}




// FETCH ARTICLE BY REGION

export async function fetchByRegion(req, res) {
  try {
    const region = req.body.region;
    const page = parseInt(req.body.page);
    const limit = 8; // Set your desired limit
     const totalArticles = await Article.countDocuments({ region });
    const response = await Article.find({ region })
    .sort({createdAt:-1})
  .skip((page - 1) * limit)                   
  .limit(limit); 


    res.status(200).json({ articles:response, totalPages: Math.ceil(totalArticles / limit) });
  } catch (err) {
    console.error("❌ Aggregation Error:", err);
    res.status(500).json({ error: err.message });
  }
}

// GET ALL TOPICS LIST

export async function fetchTopicsList(req, res) {
  try {
    const topics = await Topic.find({ name: { $in: topicsList } }).sort({ articleCount: -1 });



    res.status(200).json(topics);
  } catch (err) {
    console.error("❌ Aggregation Error:", err);
    res.status(500).json({ error: err.message });
  }
}

// GET ALL SOURCES LIST

export async function fetchSourcesList(req, res) {
  try {
    const sources = await Source.find();

    console.log("response", sources);

    res.status(200).json(sources);
  } catch (err) {
    console.error("❌ Aggregation Error:", err);
    res.status(500).json({ error: err.message });
  }
}

// GET ALL REGIONS LIST

export async function fetchRegionsList(req, res) {
  try {
    const regions = await Region.find();



    res.status(200).json(regions);
  } catch (err) {
    console.error("❌ Aggregation Error:", err);
    res.status(500).json({ error: err.message });
  }
}

// FETCH BOOKMARKED ARTICLES



// ADD VIEW TO ARTICLE AND INCREMENT GLOBAL VIEW COUNT
export async function addView(req, res) {
  console.log("Request Body:", req.body);
  try {
    const { articleId, timeSpent = 0, userId } = req.body;

    // 1) Try to update an existing view entry
    const updateResult = await User.updateOne(
      { _id: userId, "viewedArticles.articleId": articleId },
      {
        $set: { "viewedArticles.$.viewedAt": new Date() },
        $inc: { "viewedArticles.$.timeSpent": timeSpent },
      }
    );

    // 2) If nothing was modified, push a brand-new entry
    if (updateResult.modifiedCount === 0) {
      await User.updateOne(
        { _id: userId },
        {
          $push: {
            viewedArticles: {
              articleId,
              viewedAt: new Date(),
              timeSpent,  // ← correct field name
            },
          },
        }
      );
      // 3) Increment the global article view count
      const article = await Article.findByIdAndUpdate(
        articleId,
        { $inc: { views: 1 } },
        { new: true }
      );

      if (!article) {
        return res.status(404).json({ message: "Article not found 🚫" });
      }
    }

    // console.log("Update Result:", updateResult);



    res.status(200).json({ success: true, message: "View tracked successfully" });
  } catch (error) {
    console.error("❌ Error tracking article view:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}




// GET RECOMMENDED ARTICLES BASED ON EMBEDDING

export async function getRecommendedArticles(req, res) {
  try {
    const articleEmbedding = req.body.embedding;

    if (!Array.isArray(articleEmbedding)) {
      return res.status(400).json({ error: 'Invalid embedding' });
    }

    const similarArticles = await index.query({
      vector: articleEmbedding,
      topK: 20,
      includeMetadata: true,
    });


    const formatted = similarArticles.matches.map(match => ({
      id: match.id,
      score: match.score.toFixed(3),
      ...match.metadata,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error("❌ Error fetching recommended articles:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}








//   GET RECOMMENDED ARTICLES FOR USER
export async function getRecommendedArticlesForUser(req, res) {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const seenIds = user.viewedArticles.map(a => a.articleId.toString());
    const likedIds = user.likedArticles.map(a => a.toString());
    const excludeIds = [...new Set([...seenIds, ...likedIds])]; // prevent showing again

    const recommendedArticles = await Article.find({
      topic: { $in: user.preferences.topics },   // 🏷️ match preferred topics
      source: { $in: user.preferences.sources },  // 📰 match preferred sources
      _id: { $nin: excludeIds }                   // 🚫 exclude already seen/liked
    })
      .sort({ createdAt: -1 });
    console.log("Recommended articles for user:", recommendedArticles);
    res.status(200).json(recommendedArticles);
  } catch (err) {
    console.error("❌ Error fetching recommended articles for user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}








//  FETCH HOT TOPICS EXCLUDING BREAKING ONES
export async function fetchHotTopics(req, res) {
  try {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    const breaking = await Article.find({ breakingScore: { $gte: 90 }, createdAt: { $gte: threeDaysAgo } }).sort({ createdAt: -1, breakingScore: -1 }).limit(10).select('_id');
    const excludedBreakingIds = breaking.map((a) => a._id);

    const hotTopics = await Article.find({
      _id: { $nin: excludedBreakingIds },
      createdAt: { $gte: threeDaysAgo },
     
    }).sort({ views: -1, breakingScore: -1, createdAt: -1 }).limit(3);

    res.status(200).json(hotTopics);
  } catch (err) {
    console.error("❌ Error fetching hot topics:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}








// GET TODAY'S TOP ARTICLES SLIDER

export async function getTodaysTopArticlesSlider(req, res) {



  try {

    const userId = req.query.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const seenIds = user.viewedArticles.map(a => a.articleId.toString());
    const likedIds = user.likedArticles.map(a => a.toString());




    const today = new Date();

    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);



    const threeDaysAgo = new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000);
    const breaking = await Article.find({ breakingScore: { $gte: 90 }, createdAt: { $gte: threeDaysAgo } }).sort({ createdAt: -1, breakingScore: -1 }).limit(10).select('_id');
    const excludedBreakingIds = breaking.map((a) => a._id);
    // 🔥 Get top 3 hot articles (non-breaking within 3 days)
    const hotArticles = await Article.find({
      _id: { $nin: excludedBreakingIds },
      createdAt: { $gte: threeDaysAgo },
    }).sort({ views: -1, breakingScore: -1, createdAt: -1 }).limit(3).select('_id');

    const excludedHotIds = hotArticles.map((a) => a._id);
    const excludeIds = [...new Set([...seenIds, ...likedIds, ...excludedHotIds, ...excludedBreakingIds])]; // prevent showing again

   const dailyArticles = await Article.find({
  // Match ANY of topic, source, or region 💥 (UNION)
  $or: [
    { topic:  { $in: user.preferences.topics } },
    { source: { $in: user.preferences.sources } },
    { region: { $in: user.preferences.regions } }
  ],
  // Exclude already seen articles ❌
  _id: { $nin: excludeIds },

  // Filter by today's date 📅
  createdAt: { $gte: startOfDay, $lt: endOfDay }
})
.sort({
  // Sort priority: breaking news > most viewed > newest ⚡
  breakingScore: -1,
  views: -1,
  createdAt: -1
})
.limit(10); // Limit results to 10 🚀

    console.log("Daily articles for user:", dailyArticles);
    res.status(200).json(dailyArticles);
  } catch (err) {
    console.error("❌ Error fetching daily articles for user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}



// GET TODAY'S TOP ARTICLES
export async function getTodaysTopArticles(req, res) {


          console.log("Fetching today's top articles...");


  try {

      const page  = parseInt(req.query.page,  10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip  = (page - 1) * limit;

    const userId = req.query.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const seenIds = user.viewedArticles.map(a => a.articleId.toString());
    const likedIds = user.likedArticles.map(a => a.toString());
    const excludeIds = [...new Set([...seenIds, ...likedIds])]; // prevent showing again



    const today = new Date();

    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

const baseFilter = {
  _id: { $nin: excludeIds },
  createdAt: { $gte: startOfDay, $lt: endOfDay },
  $or: [
    { topic: { $in: user.preferences.topics } },
    { source: { $in: user.preferences.sources } },
    { region: { $in: user.preferences.regions } }
  ]
};


    const totalCount = await Article.countDocuments(baseFilter);
   
    const dailyArticles = await Article.find(baseFilter).sort({ breakingScore: -1, views: -1, createdAt: -1 }).skip(skip).limit(limit);
   
    return res.status(200).json({
      dailyArticles,
      pagination: {
        totalPages:  Math.ceil(totalCount / limit),
      },
    });
  } catch (err) {
    console.error("❌ Error fetching daily articles for user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}




// GET WEEKLY ARTICLES
export async function getWeeklyArticles(req, res) {
  try {
    // 1️⃣ Parse pagination from query params (more RESTful!) 📑
    const page  = parseInt(req.query.page,  10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip  = (page - 1) * limit;

    // 2️⃣ Load user & build seen/liked lists 👀👍
    const userId = req.query.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found 🕵️‍♂️" });
    }

    const seenIds  = user.viewedArticles.map(a => a.articleId.toString());
    const likedIds = user.likedArticles.map(a => a.toString());

    // 3️⃣ Compute time windows ⏰
    const now         = new Date();
    const startOfDay  = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay    = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    const threeDaysAgo = new Date(now.getTime() - 3 * 24*60*60*1000);
    const oneWeekAgo   = new Date(now.getTime() - 7 * 24*60*60*1000);

    // 4️⃣ Fetch breaking articles (score ≥100 in last 3 days) 🔥
    const breaking = await Article.find({
      breakingScore: { $gte: 90 },
      createdAt:     { $gte: threeDaysAgo }
    })
    .sort({ createdAt: -1, breakingScore: -1 })
    .limit(10)
    .select('_id');
    const breakingIds = breaking.map(a => a._id);

    // 5️⃣ Fetch top 3 “hot” (non‑breaking, last 3 days) 🔥➡️🔥
    const hotArticles = await Article.find({
      _id:           { $nin: breakingIds },
      createdAt:     { $gte: threeDaysAgo },
    })
    .sort({ views: -1, breakingScore: -1, createdAt: -1 })
    .limit(3)
    .select('_id');
    const hotIds = hotArticles.map(a => a._id);

    // 6️⃣ Fetch today’s recommended (non‑breaking, in prefs) 🏷️🗓️
    const daily = await Article.find({
      _id:           { $nin: [...breakingIds, ...hotIds] },
      $or: [
    { topic: { $in: user.preferences.topics } },
    { source: { $in: user.preferences.sources } },
    { region: { $in: user.preferences.regions } }
  ],
      createdAt:     { $gte: startOfDay, $lt: endOfDay }
    })
    .sort({ breakingScore: -1, views: -1, createdAt: -1 })
    .limit(10)
    .select('_id');
    const dailyIds = daily.map(a => a._id);

    // 7️⃣ Build full exclusion list to avoid repeats 🙅‍♂️
    const excludeIds = [
      ...new Set([
        ...seenIds,
        ...likedIds,
        ...breakingIds,
        ...hotIds,
        ...dailyIds
      ])
    ];

    // 8️⃣ Base filter for weekly articles (score ≥50, in last 7 days) 📅
    const baseFilter = {
      _id:           { $nin: excludeIds },
      breakingScore: { $gte: 30 },
      createdAt:     { $gte: oneWeekAgo },
     $or: [
    { topic: { $in: user.preferences.topics } },
    { source: { $in: user.preferences.sources } },
    { region: { $in: user.preferences.regions } }
  ]
    };

    // 9️⃣ Count total for metadata 📊
    const totalCount = await Article.countDocuments(baseFilter);

    // 🔟 Fetch paginated weekly articles 📜
    const weeklyArticles = await Article.find(baseFilter)
      .sort({ breakingScore: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // 📢 Return articles + pagination metadata
    return res.status(200).json({
      weeklyArticles,
      pagination: {
        totalCount,
        totalPages:  Math.ceil(totalCount / limit),
        currentPage: page,
      },
    });
  } catch (err) {
    console.error("❌ Error in getWeeklyArticles:", err);
    return res.status(500).json({ error: "Internal server error 💥" });
  }
}



//  GET BREAKING DETAIL
export async function getBreakingDetail(req, res) {
  const { id } = req.params;

  try {
    const breakingDetail = await BreakingNews.findById(id);
    if (!breakingDetail) {
      return res.status(404).json({ message: "Breaking news not found" });
    }
    res.status(200).json(breakingDetail);
  } catch (err) {
    console.error("❌ Error fetching breaking detail:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};



//  SAVE AN ARTICLE

export async function saveArticle(req, res) {


  try {

    const {
      title,
      image,
      url,
      category,
      source,
      summary

    } = req.body;

    // 2️⃣ Create & save the Article
    const newArticle = new Article({ title, image, url, category, source, summary });
    const saved = await newArticle.save();

    // 3️⃣ Return the saved doc
    return res.status(200).json({
      message: "Article saved successfully! 📝",
      article: saved,
    });
  } catch (err) {
    console.error("❌ Error in saveArticle:", err);
    return res.status(500).json({ message: "Internal server error 😞" });
  }
}




// GET BY URL

export async function fetchByURL(req, res) {
  try {

    const response = await Article.find({ url: req.body.url });
    console.log("Response from fetchByURL:", response);
    res.status(200).json(response);

  }
  catch (err) {
    return res.status(500).json({ message: err });
  }
}



// GET META DATA NAME FROM ID

export async function getMetaDataNameFromId(req, res) {
  const { id } = req.params;

  try {
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json({ topic: article.topic, region: article.region, source: article.source });
  } catch (err) {
    console.error("❌ Error fetching topic name:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}



// GET RECENT ARTICLES
export async function getRecentArticles(req, res) {
  try {
    const recentArticles = await Article.find()
      .sort({ createdAt: -1 })
      .limit(5);
    res.status(200).json(recentArticles);
  } catch (err) {
    console.error("❌ Error fetching recent articles:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}


// FETCH TRENDING CATEGORIES

export async function fetchTrendingCategories(req, res) {
  try {
    const topics = await Topic.find({ name: { $in: topicsList } }).sort({ articleCount: -1 }).limit(10);



    res.status(200).json(topics);
  } catch (err) {
    console.error("❌ Aggregation Error:", err);
    res.status(500).json({ error: err.message });
  }
}




export async function getEmbedding(req,res) {
  try {
    const { text } = req.body;
    const featureExtractor = await initModel(); // ensure model is loaded
    const output = await featureExtractor(text, { pooling: 'mean', normalize: true });
    const embedding = Array.from(output.data);
    
    return res.status(200).json({ embedding });
  } catch (err) {
    console.error("❌ Error generating embedding:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}
