import * as workerpool from "workerpool";
import OpenAI from 'openai';
import { initModel } from "../ai-services/summarizer.js";
import dotenv from 'dotenv';
dotenv.config();

const a4fApiKey = process.env.a4fApiKey;
const a4fBaseUrl = 'https://api.a4f.co/v1';

if (!a4fApiKey) {
  throw new Error("❌ A4F_API_KEY is not set in environment variables");
}

const a4fClient = new OpenAI({
  apiKey: a4fApiKey,
  baseURL: a4fBaseUrl,
});

async function isBreakingNews(articleText) {
  try {
    const response = await a4fClient.chat.completions.create({
      model: "provider-2/gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a smart news assistant. 
Given a news article title and content, assign a Breaking Score between 0 and 100.
Score 100 means major breaking news (disaster, war, urgent alert).
Score 0 means it's just a regular story.
Only respond with a number (0 to 100). Output must be a number. No explanations.`
        },
        {
          role: "user",
          content: `Article Summary is: ${articleText}`
        }
      ],
      max_tokens: 10,
      temperature: 0.1
    }, {
      timeout: 30000
    });

    const reply = response.choices[0]?.message?.content?.trim() || "0";
    const score = parseInt(reply) || 0;
    console.log("Breaking Score:", score);
    return score;
  } catch (err) {
    console.error(`❌ Error detecting breaking news:`, err.message);
    return {
      error: "API_CALL_FAILED",
      score: 0,
      message: err.message || "Failed to analyze breaking news"
    };
  }
}

const MAX_CHUNK_LENGTH = 800;

function splitIntoChunks(text, maxLen = MAX_CHUNK_LENGTH) {
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    let end = start + maxLen;
    const periodIndex = text.lastIndexOf(".", end);
    if (periodIndex > start) {
      end = periodIndex + 1;
    }
    chunks.push(text.slice(start, end).trim());
    start = end;
  }
  return chunks;
}

async function summarizeChunk(text) {
  try {
    const response = await a4fClient.chat.completions.create({
      model: "provider-2/gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Summarize the following text in a concise paragraph. Keep it under 100 words."
        },
        {
          role: "user",
          content: text
        }
      ],
      max_tokens: 150,
      temperature: 0.3
    }, {
      timeout: 30000
    });

    const summary = response.choices[0]?.message?.content?.trim();
    if (!summary) {
      throw new Error("No summary returned");
    }
    return summary;
  } catch (error) {
    console.error("❌ Chunk summarization failed:", error.message);
    return text.substring(0, 200) + "...";
  }
}

async function getSummary(articleText, format = "paragraph") {
  try {
    if (!articleText || articleText.length < 50) {
      console.warn("⚠️ Article too short for summarization");
      return "Summary failed: Article too short";
    }

    const combinedSummaryText = articleText;

    if (combinedSummaryText.length > 300) {
      const finalSummary = await summarizeChunk(combinedSummaryText);
      console.log("finalSummary", finalSummary);
      return finalSummary;
    }

    console.log("finalSummary", combinedSummaryText);
    return combinedSummaryText;
  } catch (error) {
    console.error("❌ Full Article Summarization Failed:", error.message);
    return "Summary failed";
  }
}

async function getTopic(articleText) {
  const validTopics = [
    "News", "Politics", "Government", "Society", "Culture", "Science", "Technology", "Health",
    "Education", "Environment", "Economy", "Business", "Finance", "Law", "Crime", "Religion",
    "Philosophy", "History", "Art", "Media", "Entertainment", "Sports", "Lifestyle", "Travel",
    "Food", "Fashion", "Beauty", "Parenting", "Relationships", "Psychology", "Self-Improvement",
    "Animals", "Agriculture", "Energy", "Infrastructure", "Transportation", "Space", "Climate",
    "Startups", "War", "Peace", "Diplomacy", "Gender", "LGBTQ+", "Race", "Immigration", "Democracy",
    "Human Rights", "Activism", "Censorship", "Digital Media", "Internet", "Cybersecurity",
    "Social Media", "Marketing", "Advertising", "Innovation", "Careers", "Work", "Remote Work",
    "Real Estate", "Stock Market", "Cryptocurrency", "Banking", "Taxes", "Consumerism", "Big Tech",
    "Data", "Privacy", "Engineering", "Mathematics", "Physics", "Chemistry", "Biology", "Astronomy",
    "Pharmaceuticals", "Mental Health", "Fitness", "Nutrition", "Diseases", "Pandemics", "Vaccines",
    "Wellness", "Spirituality", "Justice", "Freedom", "Equality", "Traditions", "Languages",
    "Literature", "Books", "Film", "Television", "Music", "Dance", "Theatre", "Museums",
    "Photography", "Architecture", "Design", "Sustainability", "Pollution", "Natural Disasters",
    "Forests", "Oceans", "Wildlife", "Recycling", "Water", "Electricity", "Aviation", "Railways",
    "Shipping", "Space Exploration", "International Relations", "Global Organizations",
    "Public Policy", "Urban Development", "Rural Development", "Security", "Law Enforcement",
    "Judiciary", "Constitution", "Freedom of Speech", "Nationalism", "Secularism", "Genetics",
    "Bioethics", "Online Education", "Research", "Universities", "Schools", "Aging", "Inclusion",
    "Home & Living", "Minimalism", "Hobbies", "Festivals", "Holidays", "Mythology", "Local News",
    "Regional News", "Global News", "Opinion", "Investigative Journalism"
  ];

  try {
    const response = await a4fClient.chat.completions.create({
      model: "provider-2/gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a classification assistant. Return **exactly one** topic from this list:
[${validTopics.join(", ")}]
⚠️ Only return the topic name as it appears. No explanation. No punctuation.`
        },
        {
          role: "user",
          content: `Classify the topic for this article:
"${articleText}"`
        }
      ],
      max_tokens: 30,
      temperature: 0.2
    }, {
      timeout: 30000
    });

    const reply = response.choices[0]?.message?.content?.trim();
    console.log("🧠 Predicted Topic:", reply);
    return validTopics.includes(reply) ? reply : "News";
  } catch (err) {
    console.error(`❌ Error during topic classification:`, err.message);
    return "News";
  }
}

async function getRegion(articleText) {
  const validRegions = [
    "World", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
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

  try {
    const response = await a4fClient.chat.completions.create({
      model: "provider-2/gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a classification assistant. Return **exactly one** region or country from this list:
[${validRegions.join(", ")}]
If no match, return "World". Do not explain. No punctuation. No abbreviations.`
        },
        {
          role: "user",
          content: `Which country does this article belong to?
"${articleText}"`
        }
      ],
      max_tokens: 50,
      temperature: 0.2
    }, {
      timeout: 30000
    });

    const reply = response.choices[0]?.message?.content?.trim();
    console.log("🌍 Predicted Region:", reply);
    return validRegions.includes(reply) ? reply : "World";
  } catch (err) {
    console.error(`❌ Error during region classification:`, err.message);
    return "World";
  }
}

async function getSentiment(articleText) {
  try {
    const response = await a4fClient.chat.completions.create({
      model: "provider-2/gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Classify sentiment as: positive, negative, or neutral. One word only."
        },
        {
          role: "user",
          content: `"${articleText}"`
        }
      ],
      max_tokens: 10,
      temperature: 0.1
    }, {
      timeout: 30000
    });

    const reply = response.choices[0]?.message?.content?.trim().toLowerCase();
    console.log("🌍 Predicted Sentiment:", reply);
    if (['positive', 'negative', 'neutral'].includes(reply)) {
      return { sentiment: reply };
    } else {
      console.warn("⚠️ Unexpected sentiment, defaulting to neutral:", reply);
      return { sentiment: 'neutral' };
    }
  } catch (err) {
    console.error(`❌ Error with sentiment analysis:`, err.message);
    return {
      error: "API_CALL_FAILED",
      sentiment: "neutral",
      message: err.message
    };
  }
}

async function getTags(articleText) {
  try {
    const response = await a4fClient.chat.completions.create({
      model: "provider-2/gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Extract 3-5 highly relevant tags from the article. Respond ONLY with a JSON array of strings. No explanation."
        },
        {
          role: "user",
          content: `Extract tags from: "${articleText}"`
        }
      ],
      max_tokens: 100,
      temperature: 0.4
    }, {
      timeout: 30000
    });

    const reply = response.choices[0]?.message?.content?.trim();
    console.log("🏷️ Raw tags response:", reply);
    let tags = [];
    try {
      tags = JSON.parse(reply);
    } catch (e) {
      const jsonMatch = reply.match(/\[.*\]/);
      if (jsonMatch) {
        try {
          tags = JSON.parse(jsonMatch[0]);
        } catch (_) {}
      }
    }
    tags = tags
      .filter(tag => typeof tag === 'string' && tag.trim().length > 0)
      .map(tag => tag.trim().replace(/[^\w\s-]/g, '').toLowerCase())
      .slice(0, 5);
    console.log("🏷️ Extracted Tags:", tags);
    return tags;
  } catch (err) {
    console.error(`❌ Error generating tags:`, err.message);
    return [];
  }
}

async function getEmbedding(articleText) {
  try {
    const featureExtractor = await initModel();
    const output = await featureExtractor(articleText, { pooling: 'mean', normalize: true });
    const embedding = Array.from(output.data);
    console.log("🧩 Embedding generated, length:", embedding.length);
    return embedding;
  } catch (err) {
    console.error("❌ Error generating embedding:", err.message);
    return {
      error: "EMBEDDING_GENERATION_FAILED",
      embedding: [],
      message: err.message
    };
  }
}

workerpool.worker({
  getSummary,
  getSentiment,
  getTopic,
  getRegion,
  isBreakingNews,
  getTags,
  getEmbedding,
  isApiInCooldown: () => false
});