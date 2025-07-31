import {
  Newspaper,      // Used for NewsBot logo and signature
  AlertTriangle,  // Used for breaking news badge
  BookOpen,       // Used for reading description
  ExternalLink,   // Used for CTA button
  Zap,           // Used for urgency message
  Mail,          // Used for subscription info
  Bell           // Used for notification info
} from 'lucide-react'
import { Worker } from "bullmq";
import mongoose from 'mongoose';
import summarizerQueue from "../queues/aiQueue.js";
import nodemailer from "nodemailer";
import { getSummarizer } from "../ai-services/summarizer.js";
import Article from "../models/Article.js";
import pool from "../server.js";
import { connection } from "../queues/aiQueue.js";
import Region from "../models/Region.js";
import Topic from "../models/Topic.js";
import Source from "../models/Source.js";
import { index } from "../utils/pineconeClient.js";
import { only } from "node:test";
import dotenv from "dotenv";
import Url from "../models/Url.js";
import User from "../models/User.js";
import DailyCount from '../models/DailyCount.js';
dotenv.config();



let usersEmail = [];


// GET ALL USERS EMAIL
async function loadUsersEmail() {
  try {
    const users = await User.find({}, 'email');
    usersEmail = users.map(u => u.email);
    // console.log("✅ Loaded user emails for breaking notifications.");
  } catch (error) {
    // console.error("❌ Error loading user emails:", error);
  }
}
loadUsersEmail();



const sourceLogos = [
  {
    name: "AlJazeera",
    logo: "https://imgs.search.brave.com/sOYPo3PGrP5Q74CbilIAEGISw6X_qP8kNO6eQvil-bM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9wbHVz/cG5nLmNvbS9pbWct/cG5nL2FsLWphemVl/cmEtbG9nby1wbmct/ZmlsZS1hbC1qYXpl/ZXJhLWxvZ28tanBn/LTI3MTcuanBn",
  },
  {
    name: "BBC",
    logo: "https://imgs.search.brave.com/H7VWtsIQaBsTP_fCN1IeKhXPW1tglPrOaLOpwqRKdKU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi80LzQxL0JC/Q19Mb2dvXzIwMjEu/c3ZnLzI1MHB4LUJC/Q19Mb2dvXzIwMjEu/c3ZnLnBuZw",
  },
  {
    name: "CNBC",
    logo: "https://cdn.iconscout.com/icon/free/png-256/free-cnbc-logo-icon-download-in-svg-png-gif-file-formats--company-brand-world-logos-vol-14-pack-icons-283625.png",
  },
  {
    name: "NDTV",
    logo: "https://cdn.brandfetch.io/ndtv.com/fallback/lettermark/theme/dark/h/256/w/256/icon?c=1bfwsmEH20zzEfSNTed",
  },
  {
    name: "Reuters",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmVz2KdZzI709FkaBNZBOISv3zdcxhOZeb7Q&s",
  },
  {
    name: "TechCrunch",
    logo: "https://1000logos.net/wp-content/uploads/2022/09/TechCrunch-Logo-2011.png",
  },
  {
    name: "The Guardian",
    logo: "https://images.seeklogo.com/logo-png/32/1/the-guardian-new-logo-png_seeklogo-326255.png",
  },
  {
    name: "The Hindu",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStrdy7MqfG-d4d9ANKY60PziuZxhkhae8DQA&s",
  },
  {
    name: "Times of India",
    logo: "https://images.seeklogo.com/logo-png/53/1/the-times-of-india-logo-png_seeklogo-537021.png",
  },
];




let sentArticles = new Set(); // In-memory store to avoid duplicates

// ✅ Email setup using Gmail + App Password
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_PASSWORD,
  },
});

// 💌 Function to send breaking news email
async function sendBreakingEmail(article, userEmail) {
  const fullUrl = `${process.env.FRONTEND_URL}/articledetail/${article._id}`;

  await transporter.sendMail({
    from: `"NewsBot 🗞️" <${process.env.GMAIL_ID}>`,
    to: userEmail,
    subject: `BREAKING: ${article.title}`,
    html: `
    <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #333;">
      
      <!-- Header with gradient background -->
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 20px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 8px;"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>
          NewsBot
        </h1>
        <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 16px; font-weight: 500;">
          Breaking News Alert
        </p>
      </div>

      <!-- Main content area -->
      <div style="background: white; padding: 40px 30px; border-left: 1px solid #e1e5e9; border-right: 1px solid #e1e5e9;">
        
        <!-- Breaking news badge -->
        <div style="display: inline-block; background: linear-gradient(45deg, #ff6b6b, #ee5a24); color: white; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(238, 90, 36, 0.3);">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 6px;"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="m12 17 .01 0"/></svg>
          Breaking News
        </div>

        <!-- Article title -->
        <h2 style="color: #2c3e50; font-size: 24px; font-weight: 700; line-height: 1.3; margin: 0 0 20px 0; border-left: 4px solid #667eea; padding-left: 16px;">
          ${article.title}
        </h2>

        <!-- Description/teaser -->
        <p style="color: #555; font-size: 16px; margin: 0 0 30px 0; line-height: 1.6;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 8px; color: #667eea;"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
          Stay ahead of the curve with this breaking story. Click below to get the full details and latest updates.
        </p>

        <!-- Call-to-action button -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="${fullUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 16px 32px; border-radius: 50px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); transition: transform 0.2s ease;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 8px;"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            Read Full Story
          </a>
        </div>

        <!-- Social proof/urgency -->
        <div style="background: linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%); border: 1px solid #e8ebff; border-radius: 8px; padding: 20px; margin: 30px 0; text-align: center;">
          <p style="margin: 0; color: #6b73ff; font-size: 14px; font-weight: 500;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 6px;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            Don't miss out on this developing story
          </p>
        </div>

      </div>

      <!-- Footer -->
      <div style="background: #f8f9fa; padding: 30px 20px; text-align: center; border-radius: 0 0 12px 12px; border: 1px solid #e1e5e9; border-top: none;">
        
        <!-- Sign off -->
        <p style="margin: 0 0 15px 0; color: #6c757d; font-size: 16px;">
          Stay informed and stay ahead,
        </p>
        <p style="margin: 0 0 20px 0; color: #495057; font-size: 18px; font-weight: 700;">
          <span style="color: #667eea;">NewsBot</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-left: 6px; color: #667eea;"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>
        </p>

        <!-- Divider -->
        <div style="width: 50px; height: 2px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); margin: 20px auto;"></div>

        <!-- Footer links/info -->
        <p style="margin: 15px 0 0 0; color: #868e96; font-size: 12px; line-height: 1.5;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 4px;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          You're receiving this because you subscribed to breaking news alerts.<br>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 4px;"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
          Delivered instantly to keep you informed.
        </p>

      </div>

      <!-- Mobile responsiveness -->
      <style>
        @media only screen and (max-width: 600px) {
          .container { width: 100% !important; }
          .content { padding: 20px 15px !important; }
          .title { font-size: 20px !important; }
          .button { padding: 14px 24px !important; font-size: 15px !important; }
        }
      </style>

    </div>
  `,
  });

  // console.log(`📩 Email sent for: ${article.title}`);
}








const sourceMap = Object.fromEntries(sourceLogos.map((s) => [s.name, { ...s }]));









const summarizeWorker = new Worker(
  "summarizerQueue",


  async function (task) {
    //  console.log(task.data);
    const newArticle = task.data.newArticle;
    // console.log(task.data);




    if (mongoose.connection.readyState !== 1) {
      // console.log('⚠️ MongoDB not ready, retrying in 5s…');
      await summarizerQueue.add('summarizer', { newArticle }, { delay: 5000 });
      return;
    }

      const record=await DailyCount.findOne({ date: new Date().toISOString().split('T')[0] });
          if( record && record.count >= 100) {
            await summarizerQueue.add('summarizer', { newArticle }, { delay: 1000 * 60 *60 * 24  }); // Retry after 24 hours
        // console.log("❌ Daily limit reached, skipping article:", newArticle.title);
        return;
      }
    try {




      // console.log(newArticle)
      const summary = await pool.exec("getSummary", [newArticle.content]);


      const breakingScore = await pool.exec("isBreakingNews", [summary]);
      const tags = await pool.exec("getTags", [summary]);
      // console.log("Tags generated:", tags);

      const embedding = await pool.exec("getEmbedding", [newArticle.content]);
      let topic = await pool.exec("getTopic", [summary]);
      const region = await pool.exec("getRegion", [summary]);



      if (summary.length > 0) {
        const finalArticle = new Article({
          ...newArticle,
          summary,
          // sentiment,
          topic,
          region,
          breakingScore,
          tags,
          embedding
        });
        // console.log("finalAticle", finalArticle);

        const onlyEnglish = str => /^[A-Za-z\s]+$/.test(str);


        if (breakingScore>=90) {
          usersEmail.map(function (email) {

            sendBreakingEmail(finalArticle, email);


          });
        }




        // console.log("✅ finalArticle", finalArticle);




        await finalArticle.save();











        await index.upsert([
          {
            id: finalArticle._id.toString(),
            values: embedding,
            metadata: {
              title: finalArticle.title,
              topic: finalArticle.topic,
              source: finalArticle.source,
              image: finalArticle.image || "",
              url: finalArticle.url,
            }
          }
        ]);

        // console.log(`✅ Upserted article to Pinecone: ${finalArticle.title}`);

        await Region.findOneAndUpdate(
          { name: region },
          {
            $inc: { articleCount: 1 },
            $setOnInsert: { name: region },
          },
          {
            upsert: true,
          }
        );
        //  TOPIC update logic

        await Topic.findOneAndUpdate(
          { name: topic },
          {
            $inc: { articleCount: 1 },
            $setOnInsert: {
              name: topic,
            }
          },
          { upsert: true }
        );

        //  SOURCE update logic
        const matchedSource = sourceMap[finalArticle.source] || {};
        await Source.findOneAndUpdate(
          { name: finalArticle.source },
          {
            $inc: { articleCount: 1 },
            $setOnInsert: {
              name: finalArticle.source,
              logoUrl: matchedSource.logo || "",
            }
          },
          { upsert: true }
        );

        await Url.findOneAndDelete({ url: newArticle.url });

     const today = new Date().toISOString().split('T')[0];
 await DailyCount.findOneAndUpdate(
  { date: today },
  {
    $inc: { count: 1 },        // Increment count if exists
    $setOnInsert: { count: 1 } // If new, set count to 1
  },
  {
    upsert: true,   // Insert if not found
   
  }
);

        return summary;
      }
    } catch (err) {
      // console.error(`Failed to save article ${newArticle.url}:`, err);
      throw err;
    }
  },
  {
    connection, limiter: {
      max: 1,            // ✅ Max 2 jobs
      duration: 60_000,  // ✅ Per 60 seconds (1 minute)
    }
  }

);

process.on("SIGINT", () => pool.terminate());
process.on("SIGTERM", () => pool.terminate());
process.on("beforeExit", () => pool.terminate());

export default summarizeWorker;
