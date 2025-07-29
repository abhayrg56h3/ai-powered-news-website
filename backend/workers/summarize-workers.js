
import { Worker } from "bullmq";
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
import User from "../models/User.js";
dotenv.config();
const topicsList = ["News", "Politics", "Government", "Society", "Culture", "Science", "Technology", "Health", "Education", "Environment", "Economy", "Business", "Finance", "Law", "Crime", "Religion", "Philosophy", "History", "Art", "Media", "Entertainment", "Sports", "Lifestyle", "Travel", "Food", "Fashion", "Beauty", "Parenting", "Relationships", "Psychology", "Self-Improvement", "Animals", "Agriculture", "Energy", "Infrastructure", "Transportation", "Space", "Climate", "Startups", "War", "Peace", "Diplomacy", "Gender", "LGBTQ+", "Race", "Immigration", "Democracy", "Human Rights", "Activism", "Censorship", "Digital Media", "Internet", "Cybersecurity", "Social Media", "Marketing", "Advertising", "Innovation", "Careers", "Work", "Remote Work", "Real Estate", "Stock Market", "Cryptocurrency", "Banking", "Taxes", "Consumerism", "Big Tech", "Data", "Privacy", "Engineering", "Mathematics", "Physics", "Chemistry", "Biology", "Astronomy", "Pharmaceuticals", "Mental Health", "Fitness", "Nutrition", "Diseases", "Pandemics", "Vaccines", "Wellness", "Spirituality", "Justice", "Freedom", "Equality", "Traditions", "Languages", "Literature", "Books", "Film", "Television", "Music", "Dance", "Theatre", "Museums", "Photography", "Architecture", "Design", "Sustainability", "Pollution", "Natural Disasters", "Forests", "Oceans", "Wildlife", "Recycling", "Water", "Electricity", "Aviation", "Railways", "Shipping", "Space Exploration", "International Relations", "Global Organizations", "Public Policy", "Urban Development", "Rural Development", "Security", "Law Enforcement", "Judiciary", "Constitution", "Freedom of Speech", "Nationalism", "Secularism", "Genetics", "Bioethics", "Online Education", "Research", "Universities", "Schools", "Aging", "Inclusion", "Home & Living", "Minimalism", "Hobbies", "Festivals", "Holidays", "Mythology", "Local News", "Regional News", "Global News", "Opinion", "Investigative Journalism"];
const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
  "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
  "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
  "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso",
  "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic",
  "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Democratic Republic of the Congo",
  "Costa Rica", "Côte d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark",
  "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador",
  "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland",
  "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada",
  "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea North",
  "Korea South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
  "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
  "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania",
  "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
  "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
  "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman",
  "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines",
  "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
  "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
  "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia",
  "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain",
  "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
  "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia",
  "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
  "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
  "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe", "Palestine", "Kosovo", "Abkhazia",
  "South Ossetia", "Artsakh", "Transnistria", "Northern Cyprus", "Western Sahara",
  "Somaliland", "Cook Islands", "Niue", "Åland Islands", "Faroe Islands", "Greenland",
  "Hong Kong", "Macau", "Kurdistan Region", "Bougainville", "Bangsamoro", "Azores",
  "Madeira", "Aceh", "Gagauzia", "Mount Athos", "Svalbard", "Jan Mayen", "Rotuma",
  "Puerto Rico", "Northern Mariana Islands", "Guam", "US Virgin Islands", "American Samoa",
  "French Polynesia", "New Caledonia", "Saint Martin", "Saint Barthélemy", "Wallis and Futuna",
  "Mayotte", "Martinique", "French Guiana", "Aruba", "Curacao", "Sint Maarten", "Gibraltar",
  "Bermuda", "Cayman Islands", "British Virgin Islands", "Montserrat", "Anguilla", "Nevis",
  "Rodrigues", "Embera-Wounaan", "Kuna Yala", "Ngöbe-Buglé", "Danu", "Kokang", "Naga",
  "Pa-Laung", "Pa-O", "Wa", "Vojvodina", "Kosovo and Metohija"
];

let usersEmail = [];


// GET ALL USERS EMAIL
async function loadUsersEmail() {
  try {
    const users = await User.find({}, 'email');
    usersEmail = users.map(u => u.email);
    console.log("✅ Loaded user emails for breaking notifications.");
  } catch (error) {
    console.error("❌ Error loading user emails:", error);
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
    subject: `🚨 BREAKING: ${article.title}`,
    html: `
      <div style="font-family:Arial, sans-serif;">
        <h2>${article.title}</h2>
        <p>📰 Click below to read the full story:</p>
        <a href="${fullUrl}" style="padding: 10px 15px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
          🔗 Read More
        </a>
        <p style="margin-top:20px;">Stay informed,<br><strong>NewsBot 🗞️</strong></p>
      </div>
    `,
  });

  console.log(`📩 Email sent for: ${article.title}`);
}








const sourceMap = Object.fromEntries(sourceLogos.map((s) => [s.name, { ...s }]));

const summarizeWorker = new Worker(
  "summarizerQueue",

  async function (task) {
    //  console.log(task.data);
    const newArticle = task.data.newArticle;
    // console.log(task.data);

    try {



       const apistatus=await pool.exec("isApiInCooldown",[]);
      if (apistatus.isCooldown) {
         const delay = Math.max(0, apistatus.cooldownUntil - Date.now() + 1000);
  await summarizerQueue.add("summarizer", { newArticle: task.data.newArticle }, { delay });
  return;
      }
      // console.log(newArticle)
      const summary = await pool.exec("getSummary", [newArticle.content]);


      const breakingScore = await pool.exec("isBreakingNews", [summary]);
      const tags = await pool.exec("getTags", [summary]);
      console.log("Tags generated:", tags);

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
        // console.log("finalAticle",finalArticle);

        const onlyEnglish = str => /^[A-Za-z\s]+$/.test(str);


        if (breakingScore >=90) {
          usersEmail.map(function (email) {

            sendBreakingEmail(finalArticle, email);


          });
        }




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

        console.log(`✅ Upserted article to Pinecone: ${finalArticle.title}`);

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



        return summary;
      }
    } catch (err) {
      console.error(`Failed to save article ${newArticle.url}:`, err);
      throw err;
    }
  },
  { connection }
);

process.on("SIGINT", () => pool.terminate());
process.on("SIGTERM", () => pool.terminate());
process.on("beforeExit", () => pool.terminate());

export default summarizeWorker;
