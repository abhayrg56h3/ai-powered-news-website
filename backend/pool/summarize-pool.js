import * as workerpool from "workerpool";
import axios from "axios";
import { initModel } from "../ai-services/summarizer.js";
import { Pinecone } from "@pinecone-database/pinecone";

class AIServiceError extends Error {
  constructor(message, type, details = {}) {
    super(message);
    this.type = type;
    this.details = details;
    this.timestamp = new Date().toISOString();
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AIServiceError);
    }
  }
}

const serviceMetrics = {
  requests: 0,
  successes: 0,
  failures: 0,
  errorTypes: {},
  latency: [],
  
  recordRequest() {
    this.requests++;
  },
  
  recordSuccess(latency) {
    this.successes++;
    this.latency.push(latency);
  },
  
  recordFailure(errorType) {
    this.failures++;
    this.errorTypes[errorType] = (this.errorTypes[errorType] || 0) + 1;
  },
  
  getStats() {
    const avgLatency = this.latency.length > 0
      ? this.latency.reduce((a, b) => a + b, 0) / this.latency.length
      : 0;
      
    return {
      totalRequests: this.requests,
      successRate: this.requests > 0 ? (this.successes / this.requests) * 100 : 0,
      avgLatency: Math.round(avgLatency),
      errorDistribution: this.errorTypes
    };
  }
};

const SERVICE_CONFIG = {
  API_TIMEOUT: parseInt(process.env.AI_SERVICE_TIMEOUT) || 25000,
  MAX_RETRIES: parseInt(process.env.AI_SERVICE_MAX_RETRIES) || 2,
  CHUNK_SIZE: parseInt(process.env.SUMMARY_CHUNK_SIZE) || 800,
  MIN_ARTICLE_LENGTH: parseInt(process.env.MIN_ARTICLE_LENGTH) || 50,
  EXHAUSTION_COOLDOWN: parseInt(process.env.KEY_EXHAUSTION_COOLDOWN) || 24 * 60 * 60 * 1000,
  TEMPORARY_BLOCK_COOLDOWN: parseInt(process.env.KEY_TEMPORARY_BLOCK_COOLDOWN) || 5 * 60 * 1000,
  MAX_FAILURES_BEFORE_BLOCK: parseInt(process.env.MAX_FAILURES_BEFORE_BLOCK) || 3,
  KEY_ROTATION_STRATEGY: process.env.KEY_ROTATION_STRATEGY || 'ROUND_ROBIN'
};

console.log("AI Service Configuration:", {
  timeout: SERVICE_CONFIG.API_TIMEOUT,
  maxRetries: SERVICE_CONFIG.MAX_RETRIES,
  chunkSize: SERVICE_CONFIG.CHUNK_SIZE,
  exhaustionCooldown: SERVICE_CONFIG.EXHAUSTION_COOLDOWN,
  keyRotationStrategy: SERVICE_CONFIG.KEY_ROTATION_STRATEGY
});

const API_KEY_STATUS = {
  AVAILABLE: 'available',
  EXHAUSTED: 'exhausted',
  TEMPORARILY_BLOCKED: 'temporarily_blocked'
};

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
].filter(key => key);

const apiKeyStates = API_KEYS.map(key => ({
  key,
  status: API_KEY_STATUS.AVAILABLE,
  lastExhaustionTime: 0,
  failureCount: 0,
  cooldownUntil: 0,
  usageCount: 0,
  lastUsed: 0
}));

export let lastExhaustionTime = 0;

async function withRetryAndCircuitBreaker(operation, options = {}) {
  const {
    maxRetries = SERVICE_CONFIG.MAX_RETRIES,
    initialDelay = 1000,
    backoffFactor = 2,
    circuitBreakerTimeout = 30000
  } = options;
  
  let lastError;
  let delay = initialDelay;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      if (error.response?.status === 400 || error.response?.status === 401) {
        throw error;
      }
      
      if (error.response?.headers?.['retry-after']) {
        delay = parseInt(error.response.headers['retry-after']) * 1000;
      }
      
      if (attempt < maxRetries) {
        console.log(`Attempt ${attempt + 1} failed. Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= backoffFactor;
      }
    }
  }
  
  console.error('All retry attempts failed. Opening circuit breaker.');
  throw lastError;
}

function sanitizeInput(text) {
  if (!text) return '';
  
  let cleanText = text
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  const MAX_INPUT_LENGTH = 50000;
  if (cleanText.length > MAX_INPUT_LENGTH) {
    console.warn(`Input truncated from ${cleanText.length} to ${MAX_INPUT_LENGTH} characters`);
    cleanText = cleanText.substring(0, MAX_INPUT_LENGTH);
  }
  
  return cleanText;
}

function validateArticleText(articleText) {
  const cleanText = sanitizeInput(articleText);
  
  if (!cleanText) {
    throw new AIServiceError("Article text is empty after sanitization", "VALIDATION_ERROR", {
      originalLength: articleText?.length || 0
    });
  }
  
  if (cleanText.length < SERVICE_CONFIG.MIN_ARTICLE_LENGTH) {
    throw new AIServiceError(
      `Article text is too short for meaningful analysis (min ${SERVICE_CONFIG.MIN_ARTICLE_LENGTH} chars)`, 
      "VALIDATION_ERROR", 
      { 
        actualLength: cleanText.length,
        minLength: SERVICE_CONFIG.MIN_ARTICLE_LENGTH
      }
    );
  }
  
  return cleanText;
}

function getNextAvailableKey() {
  const now = Date.now();
  
  apiKeyStates.forEach(state => {
    if (state.status === API_KEY_STATUS.TEMPORARILY_BLOCKED && 
        now > state.cooldownUntil) {
      state.status = API_KEY_STATUS.AVAILABLE;
      state.failureCount = 0;
    }
  });
  
  const availableKeys = apiKeyStates.filter(
    state => state.status === API_KEY_STATUS.AVAILABLE
  );
  
  if (availableKeys.length === 0) {
    const nextAvailable = apiKeyStates
      .filter(state => state.cooldownUntil > 0)
      .sort((a, b) => a.cooldownUntil - b.cooldownUntil)[0];
      
    lastExhaustionTime = nextAvailable ? nextAvailable.cooldownUntil : now;
    return null;
  }
  
  let selectedKey;
  switch (SERVICE_CONFIG.KEY_ROTATION_STRATEGY) {
    case 'LEAST_USED':
      selectedKey = availableKeys.sort(
        (a, b) => a.usageCount - b.usageCount
      )[0];
      break;
    case 'RANDOM':
      selectedKey = availableKeys[
        Math.floor(Math.random() * availableKeys.length)
      ];
      break;
    case 'ROUND_ROBIN':
    default:
      const lastUsedIndex = apiKeyStates
        .map(s => s.lastUsed)
        .lastIndexOf(Math.max(...apiKeyStates.map(s => s.lastUsed || 0)));
        
      const nextIndex = (lastUsedIndex + 1) % apiKeyStates.length;
      selectedKey = apiKeyStates.find(
        (state, index) => index === nextIndex && state.status === API_KEY_STATUS.AVAILABLE
      ) || availableKeys[0];
  }
  
  selectedKey.lastUsed = Date.now();
  selectedKey.usageCount = (selectedKey.usageCount || 0) + 1;
  
  return selectedKey;
}

function updateKeyStatus(keyState, error) {
  if (!keyState) return;
  
  if (error.response?.data?.message?.includes("free-models-per-day") || 
      error.response?.status === 429) {
    console.error(`❌ Key exhausted or rate limited:`, error.message);
    keyState.status = API_KEY_STATUS.EXHAUSTED;
    keyState.cooldownUntil = Date.now() + SERVICE_CONFIG.EXHAUSTION_COOLDOWN;
  } else if (error.code === 'ECONNABORTED' || error.response?.status >= 500) {
    keyState.failureCount = (keyState.failureCount || 0) + 1;
    
    if (keyState.failureCount >= SERVICE_CONFIG.MAX_FAILURES_BEFORE_BLOCK) {
      keyState.status = API_KEY_STATUS.TEMPORARILY_BLOCKED;
      keyState.cooldownUntil = Date.now() + SERVICE_CONFIG.TEMPORARY_BLOCK_COOLDOWN;
    }
  }
}

async function isBreakingNews(articleText) {
  const startTime = Date.now();
  serviceMetrics.recordRequest();
  
  try {
    const cleanText = validateArticleText(articleText);
    const MAX_SCORE = 100;
    const MIN_SCORE = 0;
    
    if (cleanText.length < 100) {
      console.warn("⚠️ Very short article, defaulting to low breaking news score");
      serviceMetrics.recordSuccess(Date.now() - startTime);
      return 10;
    }
    
    const score = await withRetryAndCircuitBreaker(async () => {
      const keyState = getNextAvailableKey();
      if (!keyState) {
        throw new AIServiceError("All API keys exhausted with no available cooldown", "API_KEY_EXHAUSTED");
      }
      
      try {
        const response = await axios.post(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            model: "qwen/qwen3-coder:free",
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
                content: `Article Summary is : ${cleanText.substring(0, 4000)}"`,
              },
            ],
            max_tokens: 10
          },
          {
            headers: {
              Authorization: `Bearer ${keyState.key}`,
              "Content-Type": "application/json",
              "HTTP-Referer": "http://localhost",
              "X-Title": "RegionClassifier",
            },
            timeout: SERVICE_CONFIG.API_TIMEOUT
          }
        );
        
        let reply = response.data.choices[0].message.content.trim();
        
        const scoreMatch = reply.match(/\d+/);
        if (!scoreMatch) {
          throw new AIServiceError(`Invalid response format: "${reply}"`, "API_RESPONSE_ERROR");
        }
        
        let score = parseInt(scoreMatch[0]);
        
        if (score < MIN_SCORE || score > MAX_SCORE) {
          console.warn(`Score ${score} out of range, clamping to ${MIN_SCORE}-${MAX_SCORE}`);
          score = Math.max(MIN_SCORE, Math.min(MAX_SCORE, score));
        }
        
        console.log("Breaking Score:", score, "using key", keyState.key.substring(0, 5) + "...");
        return score;
      } catch (err) {
        updateKeyStatus(keyState, err);
        throw err;
      }
    }, {
      maxRetries: SERVICE_CONFIG.MAX_RETRIES,
      initialDelay: 800
    });
    
    serviceMetrics.recordSuccess(Date.now() - startTime);
    return score;
  } catch (error) {
    serviceMetrics.recordFailure(error.type || 'UNKNOWN_ERROR');
    console.error("❌ Critical failure in isBreakingNews:", error.message);
    
    if (error.type === "API_KEY_EXHAUSTED") {
      lastExhaustionTime = Date.now();
      return {
        error: true,
        message: "All API keys exhausted. Please try again later.",
        cooldownUntil: lastExhaustionTime + SERVICE_CONFIG.EXHAUSTION_COOLDOWN,
        fallbackScore: 20
      };
    }
    
    const urgencyKeywords = [
      'emergency', 'crisis', 'disaster', 'attack', 'war', 'kill', 'dead', 
      'injured', 'explosion', 'alert', 'urgent', 'breaking', 'immediately'
    ];
    
    const keywordCount = urgencyKeywords.filter(keyword => 
      cleanText.toLowerCase().includes(keyword)
    ).length;
    
    const fallbackScore = Math.min(40, keywordCount * 8);
    console.log(`Using fallback breaking news score: ${fallbackScore}`);
    
    return fallbackScore;
  }
}

function splitIntoChunks(text, maxLen = SERVICE_CONFIG.CHUNK_SIZE) {
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    let end = start + maxLen;
    const periodIndex = text.lastIndexOf(".", end);
    if (periodIndex > start && periodIndex <= end) {
      end = periodIndex + 1;
    } else {
      const boundaryIndex = Math.max(
        text.lastIndexOf("!", end),
        text.lastIndexOf("?", end)
      );
      if (boundaryIndex > start && boundaryIndex <= end) {
        end = boundaryIndex + 1;
      } else {
        const spaceIndex = text.lastIndexOf(" ", end);
        if (spaceIndex > start) {
          end = spaceIndex;
        }
      }
    }
    chunks.push(text.slice(start, end).trim());
    start = end;
  }
  return chunks;
}

async function summarizeChunk(text) {
  const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";
  const HF_API_KEY = process.env.HF_API_KEY;
  
  if (!HF_API_KEY) {
    throw new AIServiceError("Hugging Face API key not configured", "CONFIGURATION_ERROR");
  }
  
  try {
    const response = await axios.post(
      HUGGINGFACE_API_URL,
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: SERVICE_CONFIG.API_TIMEOUT
      }
    );
    const summary = response.data?.[0]?.summary_text?.trim();
    if (!summary) throw new Error("Chunk summary failed");
    return summary;
  } catch (error) {
    console.error("❌ Chunk summarization failed:", error.message);
    return text.substring(0, 200) + "...";
  }
}

async function generateSummaryWithFallbacks(text, format) {
  const MAX_CHUNK_LENGTH = SERVICE_CONFIG.CHUNK_SIZE;
  const chunks = splitIntoChunks(text, MAX_CHUNK_LENGTH);
  console.log(`✂️ Split into ${chunks.length} chunks`);
  
  const partialSummaries = [];
  for (const [index, chunk] of chunks.entries()) {
    try {
      const summary = await withRetryAndCircuitBreaker(
        () => summarizeChunk(chunk),
        { maxRetries: SERVICE_CONFIG.MAX_RETRIES }
      );
      partialSummaries.push(summary);
    } catch (chunkError) {
      console.error(`❌ Chunk ${index + 1} summarization failed:`, chunkError.message);
      partialSummaries.push(chunk.substring(0, 150) + "...");
    }
  }
  
  if (partialSummaries.length === 0) {
    throw new AIServiceError("No chunks were successfully summarized", "SUMMARIZATION_ERROR");
  }
  
  const combinedSummaryText = partialSummaries.join(" ");
  
  if (combinedSummaryText.length > 300) {
    try {
      return await withRetryAndCircuitBreaker(
        () => summarizeChunk(combinedSummaryText),
        { maxRetries: 1 }
      );
    } catch (finalError) {
      console.error("❌ Final summarization failed, using combined chunks:", finalError.message);
      return combinedSummaryText;
    }
  }
  
  return combinedSummaryText;
}

function createTruncatedSummary(text) {
  const idealLength = 150;
  let endPos = idealLength;
  
  const sentenceEnd = text.substring(0, idealLength + 50).lastIndexOf('.');
  if (sentenceEnd > idealLength - 30 && sentenceEnd <= idealLength + 30) {
    endPos = sentenceEnd + 1;
  }
  else {
    const spacePos = text.substring(0, idealLength + 20).lastIndexOf(' ');
    if (spacePos > idealLength - 20) {
      endPos = spacePos;
    }
  }
  
  let summary = text.substring(0, endPos).trim();
  if (summary.length < 50) {
    summary = text.substring(0, Math.min(200, text.length));
  }
  
  if (!/[\.\!\?]$/.test(summary) && summary.length < text.length) {
    summary += "...";
  }
  
  return summary;
}

async function getSummary(articleText, format = "paragraph") {
  const startTime = Date.now();
  serviceMetrics.recordRequest();
  
  try {
    const cleanText = validateArticleText(articleText);
    
    if (cleanText.length < 200) {
      console.warn("⚠️ Article too short for summarization");
      const result = cleanText;
      serviceMetrics.recordSuccess(Date.now() - startTime);
      return result;
    }
    
    try {
      const result = await generateSummaryWithFallbacks(cleanText, format);
      serviceMetrics.recordSuccess(Date.now() - startTime);
      return result;
    } catch (primaryError) {
      console.error("❌ Primary summarization failed, trying fallback methods:", primaryError.message);
      
      try {
        const result = createTruncatedSummary(cleanText);
        serviceMetrics.recordSuccess(Date.now() - startTime);
        return result;
      } catch (truncationError) {
        console.error("❌ Truncation fallback failed:", truncationError.message);
        const result = "Summary unavailable at this time. The article processing system is temporarily experiencing issues.";
        serviceMetrics.recordSuccess(Date.now() - startTime);
        return result;
      }
    }
  } catch (validationError) {
    serviceMetrics.recordFailure(validationError.type || 'VALIDATION_ERROR');
    console.error("❌ Summary validation error:", validationError.message);
    return "Cannot summarize: " + validationError.message;
  }
}

function findFuzzyMatch(input, validOptions) {
  const normalizedInput = input.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  for (const option of validOptions) {
    const normalizedOption = option.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (normalizedOption.includes(normalizedInput) || normalizedInput.includes(normalizedOption)) {
      return option;
    }
  }
  
  const inputWords = normalizedInput.split(/[^a-z0-9]+/).filter(w => w.length > 3);
  for (const option of validOptions) {
    const optionWords = option.toLowerCase().replace(/[^a-z0-9]/g, ' ').split(/\s+/).filter(w => w.length > 3);
    const commonWords = inputWords.filter(word => optionWords.includes(word));
    
    if (commonWords.length >= Math.min(2, inputWords.length, optionWords.length)) {
      return option;
    }
  }
  
  return null;
}

function getFallbackTopic(text, validTopics) {
  const topicKeywords = {
    "Politics": ["election", "government", "president", "congress", "senate", "parliament", "vote"],
    "Technology": ["tech", "software", "hardware", "internet", "app", "digital", "ai", "artificial intelligence"],
    "Sports": ["game", "team", "player", "score", "championship", "olympic", "football", "basketball"],
    "Health": ["health", "medical", "hospital", "doctor", "patient", "disease", "virus", "covid"],
    "Business": ["business", "company", "corporate", "market", "stock", "economy", "finance"],
    "Science": ["science", "research", "scientist", "discovery", "experiment", "physics", "chemistry"],
    "Entertainment": ["movie", "film", "music", "actor", "celebrity", "hollywood", "tv", "television"],
    "Environment": ["environment", "climate", "global warming", "pollution", "greenhouse", "emissions"]
  };
  
  let bestMatch = "News";
  let highestScore = 0;
  
  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    if (!validTopics.includes(topic)) continue;
    
    let score = 0;
    for (const keyword of keywords) {
      const regex = new RegExp(`\\b${keyword}\\b`, 'i');
      if (regex.test(text)) score += 1;
    }
    
    if (score > highestScore) {
      highestScore = score;
      bestMatch = topic;
    }
  }
  
  if (highestScore === 0) {
    if (text.length > 3000) {
      bestMatch = "News";
    } else if (/[\.\?\!]{3,}/.test(text)) {
      bestMatch = "Entertainment";
    }
  }
  
  console.log(`Using fallback topic: ${bestMatch} (score: ${highestScore})`);
  return bestMatch;
}

async function getTopic(articleText) {
  const startTime = Date.now();
  serviceMetrics.recordRequest();
  
  try {
    const cleanText = validateArticleText(articleText);
    const validTopics = [
      "News", "Politics", "Government", "Society", "Culture", "Science", "Technology", "Health", "Education", "Environment", "Economy", "Business", "Finance", "Law", "Crime", "Religion", "Philosophy", "History", "Art", "Media", "Entertainment", "Sports", "Lifestyle", "Travel", "Food", "Fashion", "Beauty", "Parenting", "Relationships", "Psychology", "Self-Improvement", "Animals", "Agriculture", "Energy", "Infrastructure", "Transportation", "Space", "Climate", "Startups", "War", "Peace", "Diplomacy", "Gender", "LGBTQ+", "Race", "Immigration", "Democracy", "Human Rights", "Activism", "Censorship", "Digital Media", "Internet", "Cybersecurity", "Social Media", "Marketing", "Advertising", "Innovation", "Careers", "Work", "Remote Work", "Real Estate", "Stock Market", "Cryptocurrency", "Banking", "Taxes", "Consumerism", "Big Tech", "Data", "Privacy", "Engineering", "Mathematics", "Physics", "Chemistry", "Biology", "Astronomy", "Pharmaceuticals", "Mental Health", "Fitness", "Nutrition", "Diseases", "Pandemics", "Vaccines", "Wellness", "Spirituality", "Justice", "Freedom", "Equality", "Traditions", "Languages", "Literature", "Books", "Film", "Television", "Music", "Dance", "Theatre", "Museums", "Photography", "Architecture", "Design", "Sustainability", "Pollution", "Natural Disasters", "Forests", "Oceans", "Wildlife", "Recycling", "Water", "Electricity", "Aviation", "Railways", "Shipping", "Space Exploration", "International Relations", "Global Organizations", "Public Policy", "Urban Development", "Rural Development", "Security", "Law Enforcement", "Judiciary", "Constitution", "Freedom of Speech", "Nationalism", "Secularism", "Genetics", "Bioethics", "Online Education", "Research", "Universities", "Schools", "Aging", "Inclusion", "Home & Living", "Minimalism", "Hobbies", "Festivals", "Holidays", "Mythology", "Local News", "Regional News", "Global News", "Opinion", "Investigative Journalism"
    ];
    
    try {
      const topic = await withRetryAndCircuitBreaker(async () => {
        const keyState = getNextAvailableKey();
        if (!keyState) {
          throw new AIServiceError("All API keys exhausted", "API_KEY_EXHAUSTED");
        }
        
        const response = await axios.post(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            model: "qwen/qwen3-coder:free",
            messages: [
              {
                role: "system",
                content: `You are a highly accurate classification assistant that reads news articles and returns the **exact** most relevant topic from the list below.
🎯 You must return **only one topic** from this list:
${JSON.stringify(validTopics)}
⚠️ Do NOT return any extra characters, punctuation, or explanation. Only return one topic exactly as it appears.
`
              },
              {
                role: "user",
                content: `Classify the topic for this article (first 2000 chars):
"${cleanText.substring(0, 2000)}"`
              }
            ],
            temperature: 0.1,
            max_tokens: 20
          },
          {
            headers: {
              Authorization: `Bearer ${keyState.key}`,
              "Content-Type": "application/json",
              "HTTP-Referer": "http://localhost",
              "X-Title": "TopicClassifier"
            },
            timeout: SERVICE_CONFIG.API_TIMEOUT
          }
        );
        
        let reply = response.data.choices[0].message.content.trim();
        
        const normalizedReply = reply.replace(/"/g, '').trim();
        const matchedTopic = validTopics.find(topic => 
          topic.toLowerCase() === normalizedReply.toLowerCase()
        );
        
        if (matchedTopic) {
          console.log("🧠 Predicted Topic:", matchedTopic);
          return matchedTopic;
        }
        
        const fuzzyMatch = findFuzzyMatch(normalizedReply, validTopics);
        if (fuzzyMatch) {
          console.log(`🔍 Fuzzy matched "${reply}" to "${fuzzyMatch}"`);
          return fuzzyMatch;
        }
        
        throw new AIServiceError(`Invalid topic response: "${reply}"`, "API_RESPONSE_ERROR");
      }, {
        maxRetries: SERVICE_CONFIG.MAX_RETRIES
      });
      
      serviceMetrics.recordSuccess(Date.now() - startTime);
      return topic;
    } catch (apiError) {
      serviceMetrics.recordFailure(apiError.type || 'API_ERROR');
      console.error("❌ Topic classification API error:", apiError.message);
      const fallbackTopic = getFallbackTopic(cleanText, validTopics);
      serviceMetrics.recordSuccess(Date.now() - startTime);
      return fallbackTopic;
    }
  } catch (error) {
    serviceMetrics.recordFailure(error.type || 'UNKNOWN_ERROR');
    console.error("❌ Critical topic classification error:", error.message);
    serviceMetrics.recordSuccess(Date.now() - startTime);
    return "News";
  }
}

async function getRegion(articleText) {
  const startTime = Date.now();
  serviceMetrics.recordRequest();
  
  try {
    const cleanText = validateArticleText(articleText);
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
      const region = await withRetryAndCircuitBreaker(async () => {
        const keyState = getNextAvailableKey();
        if (!keyState) {
          throw new AIServiceError("All API keys exhausted", "API_KEY_EXHAUSTED");
        }
        
        const response = await axios.post(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            model: "qwen/qwen3-coder:free",
            messages: [
              {
                role: "system",
                content: `You are a highly accurate classification assistant that reads news articles and identifies the most relevant region or country **only** from a fixed list.
🎯 Your goal is to return **exactly one** region or country name from the following list:
 ${JSON.stringify(validRegions)}
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
"${cleanText.substring(0, 2000)}"`
              }
            ],
            temperature: 0.2,
            max_tokens: 50,
          },
          {
            headers: {
              Authorization: `Bearer ${keyState.key}`,
              "Content-Type": "application/json",
              "HTTP-Referer": "http://localhost",
              "X-Title": "RegionClassifier",
            },
            timeout: SERVICE_CONFIG.API_TIMEOUT
          }
        );
        
        const reply = response.data.choices[0].message.content.trim();
        console.log("🌍 Predicted Region:", reply);
        
        if (validRegions.includes(reply)) {
          return reply;
        }
        
        const normalizedReply = reply.toLowerCase().replace(/[^a-z0-9]/g, '');
        const matchedRegion = validRegions.find(region => 
          region.toLowerCase().replace(/[^a-z0-9]/g, '') === normalizedReply
        );
        
        if (matchedRegion) {
          console.log(`🔍 Fuzzy matched region "${reply}" to "${matchedRegion}"`);
          return matchedRegion;
        }
        
        throw new AIServiceError(`Invalid region response: "${reply}"`, "API_RESPONSE_ERROR", {
          validRegionsCount: validRegions.length
        });
      }, {
        maxRetries: SERVICE_CONFIG.MAX_RETRIES
      });
      
      serviceMetrics.recordSuccess(Date.now() - startTime);
      return region;
    } catch (apiError) {
      serviceMetrics.recordFailure(apiError.type || 'API_ERROR');
      console.error("❌ Region classification API error:", apiError.message);
      
      const regionKeywords = {
        "United States": ["usa", "america", "united states", "us", "washington", "new york", "california"],
        "United Kingdom": ["uk", "britain", "england", "scotland", "wales", "london", "british"],
        "Canada": ["canada", "ottawa", "toronto", "montreal", "quebec"],
        "Australia": ["australia", "sydney", "melbourne", "canberra"],
        "India": ["india", "delhi", "mumbai", "bharat"]
      };
      
      let bestMatch = "World";
      let highestScore = 0;
      
      for (const [region, keywords] of Object.entries(regionKeywords)) {
        if (!validRegions.includes(region)) continue;
        
        let score = 0;
        for (const keyword of keywords) {
          const regex = new RegExp(`\\b${keyword}\\b`, 'i');
          if (regex.test(cleanText)) score += 1;
        }
        
        if (score > highestScore) {
          highestScore = score;
          bestMatch = region;
        }
      }
      
      console.log(`Using fallback region: ${bestMatch} (score: ${highestScore})`);
      serviceMetrics.recordSuccess(Date.now() - startTime);
      return bestMatch;
    }
  } catch (error) {
    serviceMetrics.recordFailure(error.type || 'UNKNOWN_ERROR');
    console.error("❌ Critical region classification error:", error.message);
    serviceMetrics.recordSuccess(Date.now() - startTime);
    return "World";
  }
}

function extractTagsFromResponse(reply) {
  let tags = [];
  try {
    tags = JSON.parse(reply);
    if (!Array.isArray(tags)) {
      console.error("❌ Response was not an array. Defaulting to empty tags.");
      tags = [];
    }
  } catch (err) {
    console.error("❌ Error parsing JSON tags:", err.message);
    const jsonMatch = reply.match(/\[.*\]/);
    if (jsonMatch) {
      try {
        tags = JSON.parse(jsonMatch[0]);
      } catch (e) {
        console.error("❌ Failed to extract JSON from response");
      }
    }
  }
  tags = tags
    .filter(tag => typeof tag === 'string' && tag.trim().length > 0)
    .map(tag => tag.trim().replace(/[^\w\s-]/g, '').toLowerCase())
    .slice(0, 5);
  return tags;
}

async function getTags(articleText) {
  const startTime = Date.now();
  serviceMetrics.recordRequest();
  
  try {
    const cleanText = validateArticleText(articleText);
    
    try {
      const tags = await withRetryAndCircuitBreaker(async () => {
        const keyState = getNextAvailableKey();
        if (!keyState) {
          throw new AIServiceError("All API keys exhausted", "API_KEY_EXHAUSTED");
        }
        
        const response = await axios.post(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            model: "qwen/qwen3-coder:free",
            messages: [
              {
                role: "system",
                content:
                  "You are a smart assistant that extracts 3-5 clean, very relevant tags and include topic named in tags from news articles for classification and search. Respond ONLY with a JSON array of strings, no explanations, no extra characters.",
              },
              {
                role: "user",
                content: `Extract relevant tags as topic names from this article (first 2000 chars):
"${cleanText.substring(0, 2000)}"`,
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${keyState.key}`,
              "Content-Type": "application/json",
              "HTTP-Referer": "http://localhost",
              "X-Title": "TagGenerator",
            },
            timeout: SERVICE_CONFIG.API_TIMEOUT
          }
        );
        let reply = response.data.choices[0].message.content.trim();
        console.log("🏷️ Raw tags response:", reply);
        
        const tags = extractTagsFromResponse(reply);
        console.log("🏷️ Extracted Tags:", tags);
        return tags;
      }, {
        maxRetries: SERVICE_CONFIG.MAX_RETRIES
      });
      
      serviceMetrics.recordSuccess(Date.now() - startTime);
      return tags;
    } catch (apiError) {
      serviceMetrics.recordFailure(apiError.type || 'API_ERROR');
      console.error("❌ Tag generation API error:", apiError.message);
      
      const topicKeywords = {
        "politics": ["election", "government", "president", "congress", "senate", "parliament", "vote"],
        "technology": ["tech", "software", "hardware", "internet", "app", "digital", "ai", "artificial intelligence"],
        "sports": ["game", "team", "player", "score", "championship", "olympic", "football", "basketball"],
        "health": ["health", "medical", "hospital", "doctor", "patient", "disease", "virus", "covid"],
        "business": ["business", "company", "corporate", "market", "stock", "economy", "finance"]
      };
      
      let detectedTopics = [];
      for (const [topic, keywords] of Object.entries(topicKeywords)) {
        let score = 0;
        for (const keyword of keywords) {
          const regex = new RegExp(`\\b${keyword}\\b`, 'i');
          if (regex.test(cleanText)) score += 1;
        }
        
        if (score > 1) {
          detectedTopics.push(topic);
        }
      }
      
      const tags = detectedTopics.slice(0, 3);
      console.log(`Using fallback tags: ${tags}`);
      serviceMetrics.recordSuccess(Date.now() - startTime);
      return tags;
    }
  } catch (error) {
    serviceMetrics.recordFailure(error.type || 'UNKNOWN_ERROR');
    console.error("❌ Critical tag generation error:", error.message);
    serviceMetrics.recordSuccess(Date.now() - startTime);
    return [];
  }
}

async function getEmbedding(articleText) {
  const startTime = Date.now();
  serviceMetrics.recordRequest();
  
  try {
    const cleanText = validateArticleText(articleText);
    
    try {
      const featureExtractor = await initModel();
      const output = await featureExtractor(cleanText, { pooling: 'mean', normalize: true });
      const embedding = Array.from(output.data);
      console.log("🧩 Embedding generated, length:", embedding.length);
      serviceMetrics.recordSuccess(Date.now() - startTime);
      return embedding;
    } catch (err) {
      serviceMetrics.recordFailure("EMBEDDING_GENERATION_FAILED");
      console.error("❌ Error generating embedding:", err.message);
      throw new AIServiceError("Embedding generation failed", "EMBEDDING_GENERATION_FAILED", {
        message: err.message
      });
    }
  } catch (error) {
    serviceMetrics.recordFailure(error.type || 'VALIDATION_ERROR');
    console.error("❌ Critical embedding generation error:", error.message);
    serviceMetrics.recordSuccess(Date.now() - startTime);
    return {
      error: "EMBEDDING_GENERATION_FAILED",
      embedding: [],
      message: error.message
    };
  }
}

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
  controllerHostUrl: process.env.PINECONE_HOST,
});
const index = pinecone.index('article-topics');

workerpool.worker({
  getSummary,
  getTopic,
  getRegion,
  isBreakingNews,
  getTags,
  getEmbedding,
  getMetrics: () => serviceMetrics.getStats()
});