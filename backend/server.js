import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import MongoStore from "connect-mongo";
import passport from "passport";
import morgan from "morgan";
import dotenv from "dotenv";
import * as workerpool from "workerpool";
import session from "express-session";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { commentRouter } from "./routes/comment.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { articlesRouter } from "./routes/articleRoutes.js";
import { authRouter } from "./routes/auth.js";
import { userRouter } from "./routes/user.js";
import {userPreferenceCron} from "./cron/userPreferenceCron.js";
import { articleDeletionCron } from "./cron/userPreferenceCron.js";
// import ndtvNews from "./scrapers/ndtv.js";
// import cnbcNews from "./scrapers/cnbc.js";
// import guardianNews from "./scrapers/thegaurdian.js";
// import scrapeTechCrunchNews from "./scrapers/techcrunch.js";
// import summarizeWorker from "./workers/summarize-workers.js";
// import scrapeBBCNews from "./scrapers/bbcScraper.js";
// import scrapeAlJazeeraNews from "./scrapers/aljazira.js";
// import theHinduNews from "./scrapers/thehindu.js";
// import toiNews from "./scrapers/timesofindia.js";
import { topic_source_region_list_router } from "./routes/region-topic-source-route.js";
dotenv.config();
const pool = workerpool.pool(
  path.resolve(__dirname, "./pool/summarize-pool.js"),
  {
    maxWorkers: 5,
  }
);
const app = express();

 

// Middleware


app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));


app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // Store sessions in MongoDB
      collectionName: "sessions", // Optional: specify collection name
      ttl: 1000*60*60*24*7,
      autoRemove: "interval", // Clean expired sessions
      autoRemoveInterval: 10 // Runs every 10 minutes
    }),
    cookie: {
      httpOnly: true,
      sameSite: "lax",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  origin:"http://localhost:5173",
  methods:"GET,POST,PUT,DELETE",
  credentials:true
}));



app.use("/api/article", articlesRouter);
app.use('/api/auth',authRouter);
app.use("/api/topic_source_region_list", topic_source_region_list_router);
app.use("/api/user",userRouter);
app.use("/api/comment",commentRouter);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

  mongoose.connection.on("error", (err) => {
  console.log("❌ MongoDB connection error: ", err);
});

// scrapeBBCNews();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default pool;
