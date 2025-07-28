import axios from "axios";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";


dotenv.config();

const ELEVEN_API_KEY =process.env.ELEVEN_API_KEY ; // 🔁 Replace with your actual key
const VOICE_ID = "TxGEqnHWrfWFTfGW9XjX"; // Default voice, you can change later

async function generateAudio(text, outputFile = "output.mp3") {
  try {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      },
      {
        headers: {
          "xi-api-key": ELEVEN_API_KEY,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );

    const outputPath = path.join(__dirname, "..", outputFile);
    fs.writeFileSync(outputPath, response.data);
    console.log("✅ Audio file saved:", outputPath);
    return outputPath;
  } catch (error) {
    console.error("❌ Error generating audio:", error.response?.data || error.message);
    throw error;
  }
}
