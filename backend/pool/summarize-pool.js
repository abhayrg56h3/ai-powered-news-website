import * as workerpool from "workerpool";
import axios from "axios";
import { initModel } from "../ai-services/summarizer.js";
import { Pinecone } from "@pinecone-database/pinecone";



const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
    controllerHostUrl: process.env.PINECONE_HOST,
});
 const index = pinecone.index('article-topics');
const API_KEYS = [
  process.env.OPENROUTER_API_KEY_1,
  process.env.OPENROUTER_API_KEY_2,
  process.env.OPENROUTER_API_KEY_3,
  process.env.OPENROUTER_API_KEY_4,
  process.env.OPENROUTER_API_KEY_5,
  process.env.OPENROUTER_API_KEY_6,
  process.env.OPENROUTER_API_KEY_7,
  process.env.OPENROUTER_API_KEY_8,
  process.env.OPENROUTER_API_KEY_9,
  process.env.OPENROUTER_API_KEY_10,
  process.env.OPENROUTER_API_KEY_11,
  process.env.OPENROUTER_API_KEY_12,
  process.env.OPENROUTER_API_KEY_13,
  process.env.OPENROUTER_API_KEY_14,
  process.env.OPENROUTER_API_KEY_15

].filter(key => key); // Filter out any undefined keys

// Track key usage and exhaustion state
let keyIndex = 0;
let lastExhaustionTime = 0;
const EXHAUSTION_COOLDOWN =  4  * 60 * 1000; // 4 hour cooldown after all keys exhausted
const MAX_RETRY_ATTEMPTS = 3; // Maximum retry attempts per request


function isApiInCooldown() {
  const currentTime = Date.now();
  const timeSinceLastExhaustion = currentTime - lastExhaustionTime;
  return {
    isCooldown: timeSinceLastExhaustion < EXHAUSTION_COOLDOWN && API_KEYS.length > 0,
    cooldownUntil: lastExhaustionTime + EXHAUSTION_COOLDOWN
  };
}

// Helper to get next available key

function getNextKey() {
  const currentTime = Date.now();
  const timeSinceLastExhaustion = currentTime - lastExhaustionTime;
  
  // If we're in cooldown period after all keys were exhausted
  if (timeSinceLastExhaustion < EXHAUSTION_COOLDOWN && API_KEYS.length > 0) {
    console.warn(`⚠️ API keys in cooldown period. Will retry after ${Math.ceil((EXHAUSTION_COOLDOWN - timeSinceLastExhaustion) / 1000)} seconds.`);
    return {
      key: API_KEYS[keyIndex % API_KEYS.length],
      isOnCooldown: true
    };
  }
  
  // Get current key
  const currentKey = API_KEYS[keyIndex % API_KEYS.length];
  return {
    key: currentKey,
    isOnCooldown: false
  };
}

// Rotate to next key
function rotateKey() {
  keyIndex = (keyIndex + 1) % API_KEYS.length;
}

// Mark all keys as exhausted and start cooldown
function markAllKeysExhausted() {
  lastExhaustionTime = Date.now();
  console.error("❌ All API keys exhausted. Entering cooldown period.");
}

// BREAKING NEWS DETECTION
async function isBreakingNews(articleText) {
  if (API_KEYS.length === 0) {
    console.error("❌ No API keys configured for breaking news detection");
    return { error: "NO_API_KEYS_CONFIGURED", score: 0 };
  }
  
  let lastError;
  
  for (let attempt = 0; attempt < MAX_RETRY_ATTEMPTS; attempt++) {
    const { key, isOnCooldown } = getNextKey();
    
    if (isOnCooldown) {
      // Return a special state indicating we're in cooldown
      return { 
        error: "API_KEYS_IN_COOLDOWN", 
        score: 0,
        cooldownUntil: lastExhaustionTime + EXHAUSTION_COOLDOWN 
      };
    }
    
    if (!key) {
      console.error("❌ No valid API key available");
      return { error: "NO_VALID_API_KEY", score: 0 };
    }
    
    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "qwen/qwen3-235b-a22b-2507:free",
          messages: [
            {
              role: "system",
              content: `You are a smart news assistant. 
Given a news article title and content, assign a Breaking Score between 0 and 100.
Score 100 means major breaking news (disaster, war, urgent alert).
Score 0 means it's just a regular story.
Only respond with a number (0 to 100). Output must be a number anything other than number is not affordable. Don't include any sentence explaining the score, please`,
            },
            {
              role: "user",
              content: `Article Summary is : ${articleText}"`,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost",
            "X-Title": "RegionClassifier",
          },
          timeout: 30000
        }
      );
      
      let reply = response.data.choices[0].message.content.trim();
      // Ensure we return a number
      const score = parseInt(reply) || 0;
      console.log("Breaking Score:", score);
      return  score ;
      
    } catch (err) {
      lastError = err;
      console.error(`❌ Error with key ${keyIndex}:`, err.message);
      
      if (err.response?.data?.message?.includes("free-models-per-day") || 
          err.response?.status === 429) {
        console.warn(`🚫 Key ${keyIndex} exhausted. Trying next...`);
        rotateKey();
      } else if (err.code === 'ECONNABORTED') {
        console.warn(`⚠️ Request timed out for key ${keyIndex}. Trying next...`);
        rotateKey();
      }
      
      // Check if we've cycled through all keys
      if (keyIndex % API_KEYS.length === 0 && attempt === MAX_RETRY_ATTEMPTS - 1) {
        markAllKeysExhausted();
      }
    }
  }
  
  console.error("❌ Failed to get breaking news score after multiple attempts");
  return { 
    error: "API_CALL_FAILED", 
    score: 0,
    message: lastError?.message || "Failed to analyze breaking news"
  };
}

// SUMMARY
const MAX_CHUNK_LENGTH = 800; // Safe chunk size (~200 tokens)
function splitIntoChunks(text, maxLen = MAX_CHUNK_LENGTH) {
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    let end = start + maxLen;
    // Try to break at sentence end if possible
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
  const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";
  const HF_API_KEY = process.env.HF_API_KEY; // Use env var if available
  
  try {
    const response = await axios.post(
      HUGGINGFACE_API_URL,
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 30000 // 30 second timeout
      }
    );
    
    const summary = response.data?.[0]?.summary_text?.trim();
    if (!summary) throw new Error("Chunk summary failed");
    return summary;
  } catch (error) {
    console.error("❌ Chunk summarization failed:", error.message);
    // Return a truncated version as fallback
    return text.substring(0, 200) + "..."; 
  }
}

async function getSummary(articleText, format = "paragraph") {
  try {
    if (!articleText) {
      console.warn("⚠️ Article too short for summarization");
      return "Summary failed: Article too short";
    }
    
    const chunks = splitIntoChunks(articleText);
    console.log(`✂️ Split into ${chunks.length} chunks`);
    
    // Step 1: Summarize each chunk
    const partialSummaries = [];
    for (const chunk of chunks) {
      const summary = await summarizeChunk(chunk);
      partialSummaries.push(summary);
    }
    
    // Step 2: Join mini-summaries
    const combinedSummaryText = partialSummaries.join(" ");
    
    // Step 3: Final summary (only if needed)
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

// TOPIC CLASSIFICATION
async function getTopic(articleText) {
  if (API_KEYS.length === 0) {
    console.error("❌ No API keys configured for topic detection");
    return { error: "NO_API_KEYS_CONFIGURED", topic: "News" };
  }

  const validTopics = [  // 🧠 From your `topicsList`
    "News", "Politics", "Government", "Society", "Culture", "Science", "Technology", "Health", "Education", "Environment", "Economy", "Business", "Finance", "Law", "Crime", "Religion", "Philosophy", "History", "Art", "Media", "Entertainment", "Sports", "Lifestyle", "Travel", "Food", "Fashion", "Beauty", "Parenting", "Relationships", "Psychology", "Self-Improvement", "Animals", "Agriculture", "Energy", "Infrastructure", "Transportation", "Space", "Climate", "Startups", "War", "Peace", "Diplomacy", "Gender", "LGBTQ+", "Race", "Immigration", "Democracy", "Human Rights", "Activism", "Censorship", "Digital Media", "Internet", "Cybersecurity", "Social Media", "Marketing", "Advertising", "Innovation", "Careers", "Work", "Remote Work", "Real Estate", "Stock Market", "Cryptocurrency", "Banking", "Taxes", "Consumerism", "Big Tech", "Data", "Privacy", "Engineering", "Mathematics", "Physics", "Chemistry", "Biology", "Astronomy", "Pharmaceuticals", "Mental Health", "Fitness", "Nutrition", "Diseases", "Pandemics", "Vaccines", "Wellness", "Spirituality", "Justice", "Freedom", "Equality", "Traditions", "Languages", "Literature", "Books", "Film", "Television", "Music", "Dance", "Theatre", "Museums", "Photography", "Architecture", "Design", "Sustainability", "Pollution", "Natural Disasters", "Forests", "Oceans", "Wildlife", "Recycling", "Water", "Electricity", "Aviation", "Railways", "Shipping", "Space Exploration", "International Relations", "Global Organizations", "Public Policy", "Urban Development", "Rural Development", "Security", "Law Enforcement", "Judiciary", "Constitution", "Freedom of Speech", "Nationalism", "Secularism", "Genetics", "Bioethics", "Online Education", "Research", "Universities", "Schools", "Aging", "Inclusion", "Home & Living", "Minimalism", "Hobbies", "Festivals", "Holidays", "Mythology", "Local News", "Regional News", "Global News", "Opinion", "Investigative Journalism"
  ];

  let lastError;

  for (let attempt = 0; attempt < MAX_RETRY_ATTEMPTS; attempt++) {
    const { key, isOnCooldown } = getNextKey();

    if (isOnCooldown) {
      return {
        error: "API_KEYS_IN_COOLDOWN",
        topic: "News",
        cooldownUntil: lastExhaustionTime + EXHAUSTION_COOLDOWN
      };
    }

    if (!key) {
      return { error: "NO_VALID_API_KEY", topic: "News" };
    }

    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "qwen/qwen3-235b-a22b-2507:free",
          messages: [
            {
              role: "system",
              content: `You are a highly accurate classification assistant that reads news articles and returns the **exact** most relevant topic from the list below.

🎯 You must return **only one topic** from this list:
[
    "News", "Politics", "Government", "Society", "Culture", "Science", "Technology", "Health", "Education", "Environment", "Economy", "Business", "Finance", "Law", "Crime", "Religion", "Philosophy", "History", "Art", "Media", "Entertainment", "Sports", "Lifestyle", "Travel", "Food", "Fashion", "Beauty", "Parenting", "Relationships", "Psychology", "Self-Improvement", "Animals", "Agriculture", "Energy", "Infrastructure", "Transportation", "Space", "Climate", "Startups", "War", "Peace", "Diplomacy", "Gender", "LGBTQ+", "Race", "Immigration", "Democracy", "Human Rights", "Activism", "Censorship", "Digital Media", "Internet", "Cybersecurity", "Social Media", "Marketing", "Advertising", "Innovation", "Careers", "Work", "Remote Work", "Real Estate", "Stock Market", "Cryptocurrency", "Banking", "Taxes", "Consumerism", "Big Tech", "Data", "Privacy", "Engineering", "Mathematics", "Physics", "Chemistry", "Biology", "Astronomy", "Pharmaceuticals", "Mental Health", "Fitness", "Nutrition", "Diseases", "Pandemics", "Vaccines", "Wellness", "Spirituality", "Justice", "Freedom", "Equality", "Traditions", "Languages", "Literature", "Books", "Film", "Television", "Music", "Dance", "Theatre", "Museums", "Photography", "Architecture", "Design", "Sustainability", "Pollution", "Natural Disasters", "Forests", "Oceans", "Wildlife", "Recycling", "Water", "Electricity", "Aviation", "Railways", "Shipping", "Space Exploration", "International Relations", "Global Organizations", "Public Policy", "Urban Development", "Rural Development", "Security", "Law Enforcement", "Judiciary", "Constitution", "Freedom of Speech", "Nationalism", "Secularism", "Genetics", "Bioethics", "Online Education", "Research", "Universities", "Schools", "Aging", "Inclusion", "Home & Living", "Minimalism", "Hobbies", "Festivals", "Holidays", "Mythology", "Local News", "Regional News", "Global News", "Opinion", "Investigative Journalism"
  ]

⚠️ Do NOT return any extra characters, punctuation, or explanation. Only return one topic exactly as it appears.

`
            },
            {
              role: "user",
              content: `Classify the topic for this article:\n"${articleText}"`
            }
          ],
          temperature: 0.2,
          max_tokens: 30
        },
        {
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost",
            "X-Title": "TopicClassifier"
          },
          timeout: 30000
        }
      );

      const reply = response.data.choices[0].message.content.trim();
      console.log("🧠 Predicted Topic:", reply);

      if (validTopics.includes(reply)) {
        return reply;
      } else {
        console.warn(`⚠️ Invalid topic received: "${reply}". Defaulting to "News".`);
        return "News";
      }

    } catch (err) {
      lastError = err;
      console.error(`❌ Error during topic classification with key ${keyIndex}:`, err.message);

      if (
        err.response?.data?.message?.includes("free-models-per-day") ||
        err.response?.status === 429
      ) {
        console.warn(`🚫 Key ${keyIndex} exhausted. Trying next...`);
        rotateKey();
      } else if (err.code === "ECONNABORTED") {
        console.warn(`⚠️ Request timed out for key ${keyIndex}. Trying next...`);
        rotateKey();
      }

      if (keyIndex % API_KEYS.length === 0 && attempt === MAX_RETRY_ATTEMPTS - 1) {
        markAllKeysExhausted();
      }
    }
  }

  console.error("❌ Failed to get topic after multiple attempts");
  return {
    error: "API_CALL_FAILED",
    topic: "News",
    message: lastError?.message || "Failed to determine topic"
  };
}


// REGION CLASSIFICATION
async function getRegion(articleText) {
  if (API_KEYS.length === 0) {
    console.error("❌ No API keys configured for region detection");
    return { error: "NO_API_KEYS_CONFIGURED", region: "null" };
  }
  
  let lastError;
  
  for (let attempt = 0; attempt < MAX_RETRY_ATTEMPTS; attempt++) {
    const { key, isOnCooldown } = getNextKey();
    
    if (isOnCooldown) {
      return { 
        error: "API_KEYS_IN_COOLDOWN", 
        region: "null",
        cooldownUntil: lastExhaustionTime + EXHAUSTION_COOLDOWN 
      };
    }
    
    if (!key) {
      return { error: "NO_VALID_API_KEY", region: "null" };
    }
    
    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "qwen/qwen3-235b-a22b-2507:free", 
          messages: [
            {
              role: "system",
              content: `You are a highly accurate classification assistant that reads news articles and identifies the most relevant region or country **only** from a fixed list.
🎯 Your goal is to return **exactly one** region or country name from the following list:
 ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
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
  "Pa-Laung", "Pa-O", "Wa", "Vojvodina", "Kosovo and Metohija"]
✅ Output Rules:

Return only a value that matches exactly one name from the list (including capitalization and spacing).

Do NOT use abbreviations, acronyms, or alternate names (e.g., "USA", "UK", "U.S.", "America", "Mainland China").

If only a city, state, or sub-region is mentioned (e.g., "California", "Ladakh", "Baghdad"), return its parent country or region from the list.

If no match from the list applies, return exactly this string: World (case-sensitive, no quotes, no extra characters).

⚠️ Do NOT add any explanation, notes, punctuation, emojis, or multiple names. Return just the country/region name as it appears in the list — or World.`
            },
            {
              role: "user",
              content: `Which country does this article belong to?
"${articleText}"`
            }
          ],
          temperature: 0.2,
          max_tokens: 50,
        },
        {
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost",
            "X-Title": "RegionClassifier",
          },
          timeout: 30000
        }
      );
      
      const reply = response.data.choices[0].message.content.trim();
      console.log("🌍 Predicted Region:", reply);
      
      // Validate the region is in our list
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
      
      // Check if the response is a valid region
      if (validRegions.includes(reply)) {
        return  reply ;
      } else {
        console.warn(`⚠️ Invalid region received: "${reply}". Defaulting to "null".`);
        return  "World" ;
      }
      
    } catch (err) {
      lastError = err;
      console.error(`❌ Error with key ${keyIndex}:`, err.message);
      
      if (err.response?.data?.message?.includes("free-models-per-day") || 
          err.response?.status === 429) {
        console.warn(`🚫 Key ${keyIndex} exhausted. Trying next...`);
        rotateKey();
      } else if (err.code === 'ECONNABORTED') {
        console.warn(`⚠️ Request timed out for key ${keyIndex}. Trying next...`);
        rotateKey();
      }
      
      // Check if we've cycled through all keys
      if (keyIndex % API_KEYS.length === 0 && attempt === MAX_RETRY_ATTEMPTS - 1) {
        markAllKeysExhausted();
      }
    }
  }
  
  console.error("❌ Failed to get region after multiple attempts");
  return { 
    error: "API_CALL_FAILED", 
    region: "World",
    message: lastError?.message || "Failed to determine region"
  };
}

// SENTIMENT ANALYSIS
async function getSentiment(articleText) {
  if (API_KEYS.length === 0) {
    console.error("❌ No API keys configured for sentiment analysis");
    return { error: "NO_API_KEYS_CONFIGURED", sentiment: "neutral" };
  }
  
  let lastError;
  
  for (let attempt = 0; attempt < MAX_RETRY_ATTEMPTS; attempt++) {
    const { key, isOnCooldown } = getNextKey();
    
    if (isOnCooldown) {
      return { 
        error: "API_KEYS_IN_COOLDOWN", 
        sentiment: "neutral",
        cooldownUntil: lastExhaustionTime + EXHAUSTION_COOLDOWN 
      };
    }
    
    if (!key) {
      return { error: "NO_VALID_API_KEY", sentiment: "neutral" };
    }
    
    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "mistralai/mistral-7b-instruct",
          messages: [
            {
              role: "system",
              content:
                "You are a smart assistant that classifies articles based on sentiments in positive, negative or neutral. Answer with only one word, no explanations, no other characters, please.",
            },
            {
              role: "user",
              content: `Which sentiment does this article has?
"${articleText}"`,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost",
            "X-Title": "RegionClassifier",
          },
          timeout: 30000
        }
      );
      
      let reply = response.data.choices[0].message.content.trim().toLowerCase();
      console.log("🌍 Predicted Sentiment:", reply);
      
      // Validate the response is one of the expected values
      if (['positive', 'negative', 'neutral'].includes(reply)) {
        return { sentiment: reply };
      } else {
        console.warn("⚠️ Unexpected sentiment response, defaulting to neutral:", reply);
        return { sentiment: 'neutral' };
      }
      
    } catch (err) {
      lastError = err;
      console.error(`❌ Error with key ${keyIndex}:`, err.message);
      
      if (err.response?.data?.message?.includes("free-models-per-day") || 
          err.response?.status === 429) {
        console.warn(`🚫 Key ${keyIndex} exhausted. Trying next...`);
        rotateKey();
      } else if (err.code === 'ECONNABORTED') {
        console.warn(`⚠️ Request timed out for key ${keyIndex}. Trying next...`);
        rotateKey();
      }
      
      // Check if we've cycled through all keys
      if (keyIndex % API_KEYS.length === 0 && attempt === MAX_RETRY_ATTEMPTS - 1) {
        markAllKeysExhausted();
      }
    }
  }
  
  console.error("❌ Failed to get sentiment after multiple attempts");
  return { 
    error: "API_CALL_FAILED", 
    sentiment: "neutral",
    message: lastError?.message || "Failed to determine sentiment"
  };
}

// TAG GENERATION
async function getTags(articleText) {
  if (API_KEYS.length === 0) {
    console.error("❌ No API keys configured for tag generation");
    return { error: "NO_API_KEYS_CONFIGURED", tags: [] };
  }
  
  let lastError;
  
  for (let attempt = 0; attempt < MAX_RETRY_ATTEMPTS; attempt++) {
    const { key, isOnCooldown } = getNextKey();
    
    if (isOnCooldown) {
      return { 
        error: "API_KEYS_IN_COOLDOWN", 
        tags: [],
        cooldownUntil: lastExhaustionTime + EXHAUSTION_COOLDOWN 
      };
    }
    
    if (!key) {
      return { error: "NO_VALID_API_KEY", tags: [] };
    }
    
    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "qwen/qwen3-235b-a22b-2507:free",
          messages: [
            {
              role: "system",
              content:
                "You are a smart assistant that extracts 3-5 clean, very relevant tags and include topic named in tags from news articles for classification and search. Respond ONLY with a JSON array of strings, no explanations, no extra characters.",
            },
            {
              role: "user",
              content: `Extract relevant tags as topic names from this article:
"${articleText}"`,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost",
            "X-Title": "TagGenerator",
          },
          timeout: 30000
        }
      );
      
      let reply = response.data.choices[0].message.content.trim();
      console.log("🏷️ Raw tags response:", reply);
      
      let tags = [];
      try {
        tags = JSON.parse(reply);
        if (!Array.isArray(tags)) {
          console.error("❌ Response was not an array. Defaulting to empty tags.");
          tags = [];
        }
      } catch (err) {
        console.error("❌ Error parsing JSON tags:", err.message);
        // Try to extract a JSON array from the response if it's malformed
        const jsonMatch = reply.match(/\[.*\]/);
        if (jsonMatch) {
          try {
            tags = JSON.parse(jsonMatch[0]);
          } catch (e) {
            console.error("❌ Failed to extract JSON from response");
          }
        }
      }
      
      // Filter and clean tags
      tags = tags
        .filter(tag => typeof tag === 'string' && tag.trim().length > 0)
        .map(tag => tag.trim().replace(/[^\w\s-]/g, '').toLowerCase())
        .slice(0, 5); // Limit to 5 tags
      
      console.log("🏷️ Extracted Tags:", tags);
      return  tags ;
      
    } catch (err) {
      lastError = err;
      console.error(`❌ Error with key ${keyIndex}:`, err.message);
      
      if (err.response?.data?.message?.includes("free-models-per-day") || 
          err.response?.status === 429) {
        console.warn(`🚫 Key ${keyIndex} exhausted. Trying next...`);
        rotateKey();
      } else if (err.code === 'ECONNABORTED') {
        console.warn(`⚠️ Request timed out for key ${keyIndex}. Trying next...`);
        rotateKey();
      }
      
      // Check if we've cycled through all keys
      if (keyIndex % API_KEYS.length === 0 && attempt === MAX_RETRY_ATTEMPTS - 1) {
        markAllKeysExhausted();
      }
    }
  }
  
  console.error("❌ Failed to get tags after multiple attempts");
  return { 
    error: "API_CALL_FAILED", 
    tags: [],
    message: lastError?.message || "Failed to generate tags"
  };
}

// EMBEDDING GENERATION
async function getEmbedding(articleText) {
  try {
    const featureExtractor = await initModel(); // ensure model is loaded
    const output = await featureExtractor(articleText, { pooling: 'mean', normalize: true });
    const embedding = Array.from(output.data);
    console.log("🧩 Embedding generated, length:", embedding.length);
    return embedding ;
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
  isApiInCooldown,
});