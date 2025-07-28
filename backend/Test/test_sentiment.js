// test_sentiment.js

import { pipeline } from "@xenova/transformers";

async function main() {
  console.log("🔍 Starting minimal sentiment test…");

  // 1️⃣ Load the sentiment-analysis pipeline from Xenova
  let sentimenter;
  try {
    sentimenter = await pipeline(
      "sentiment-analysis",
      "Xenova/twitter-roberta-base-sentiment-latest"
    );
    console.log("✅ Pipeline loaded! Type:", typeof sentimenter);
  } catch (err) {
    console.error("❌ Failed to load pipeline:", err);
    return;
  }

  // 2️⃣ Ensure the pipeline’s tokenizer has .encode() and .decode()
  if (
    !sentimenter.tokenizer ||
    typeof sentimenter.tokenizer.encode !== "function" ||
    typeof sentimenter.tokenizer.decode !== "function"
  ) {
    console.error(
      "❌ The loaded pipeline is missing .tokenizer.encode() or .tokenizer.decode()!"
    );
    return;
  }
  console.log("🛠️  Tokenizer is ready (encode & decode methods found).");

  // Helper function to truncate a string to ≤ maxTokens:
  async function truncateToMaxTokens(text, maxTokens = 500) {
    // ✨ Encode the input text → this returns a number[] of token IDs.
    const ids = sentimenter.tokenizer.encode(text);
    const tokenCount = ids.length;

    if (tokenCount <= maxTokens) {
      // No need to truncate
      return text;
    }

    console.warn(
      `⚠️ Input has ${tokenCount} tokens (too long). Truncating to ${maxTokens} tokens…`
    );
    // Slice the first maxTokens IDs
    const truncatedIds = ids.slice(0, maxTokens);
    // Decode back into a string
    const truncatedString = sentimenter.tokenizer.decode(truncatedIds);
    return truncatedString;
  }

  // 3️⃣ Test with a normal‐length string
  const shortText =
    "I love sunny days and reading a good book by the beach!";
  console.log("\n📝 Test 1: Short text:", shortText);
  try {
    // Truncate (will no-op because it’s already short)
    const text1 = await truncateToMaxTokens(shortText);
    // Run inference
    const result1 = await sentimenter(text1);
    console.log("👉 Sentiment result:", result1);
    // Example output: [ { label: "POSITIVE", score: 0.998 } ]
  } catch (err) {
    console.error("❌ Error during inference (short text):", err);
  }

  // 4️⃣ Test with a super‐long string (≈3000 “hello” words)
  const manyWords = Array(3000).fill("hello").join(" ");
  console.log("\n📝 Test 2: Very long text (~3000 words)…");
  try {
    // Truncate down to ≤500 tokens
    const truncatedLong = await truncateToMaxTokens(manyWords);
    // After truncation, count tokens again:
    const afterIds = sentimenter.tokenizer.encode(truncatedLong);
    console.log("→ After truncation: token count =", afterIds.length);

    // Run inference on the truncated string
    const result2 = await sentimenter(truncatedLong);
    console.log("👉 Sentiment result (after truncate):", result2);
    console.log(
      "🎉 No expand‐shape crash because we truncated under 512 tokens!"
    );
  } catch (err) {
    console.error("❌ Error during inference (long text):", err);
  }

  console.log("\n🏁 Test complete.");
}

main();
