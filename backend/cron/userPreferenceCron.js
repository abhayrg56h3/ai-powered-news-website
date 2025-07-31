import cron from 'node-cron';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import DailyCount from '../models/DailyCount.js';
// Handle __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ✅ Correct path resolution relative to this file
const scriptPath = path.resolve(__dirname, './updateUserPreferences.js');
const scriptPath2 = path.resolve(__dirname, './deleteArticle.js');

// ✅ Schedule cron job to run every hour
const userPreferenceCron = cron.schedule(
  '0 12 * * *', // daily at noon
  () => {
    exec(`node "${scriptPath}"`, (err, stdout, stderr) => {
      if (err) {
        console.error(`❌ Error executing updateUserPreferences: ${err.message}`);
        return;
      }
      if (stderr) {
        console.error(`⚠️ stderr: ${stderr}`);
        return;
      }
      console.log(`✅ updateUserPreferences completed successfully:\n${stdout}`);
    });
  },
  {
    scheduled: false,
    timezone: 'Asia/Kolkata',
  }
);

// ✅ Schedule cron job to run every day at noon
const articleDeletionCron = cron.schedule(
  '0 12 * * *', // daily at noon
  () => {
    exec(`node "${scriptPath2}"`, (err, stdout, stderr) => {
      if (err) {
        console.error(`❌ Error executing deleteArticle: ${err.message}`);
        return;
      }
      if (stderr) {
        console.error(`⚠️ stderr: ${stderr}`);
        return;
      }
      console.log(`✅ deleteArticle completed successfully:\n${stdout}`);
    });
  },
  {
    scheduled: false,
    timezone: 'Asia/Kolkata',
  }
);


const dailyCountDeletion = cron.schedule('59 23 * * *', async () => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const deleted = await DailyCount.deleteOne({ date: today });
    
    if (deleted.deletedCount > 0) {
      console.log(`🧹 Daily scrape record for ${today} deleted successfully 🗑️`);
    } else {
      console.log(`ℹ️ No scrape record to delete for ${today}`);
    }
  } catch (err) {
    console.error("❌ Error deleting daily count at EOD:", err);
  }
});

// 🟢 Export them correctly!
export { userPreferenceCron, articleDeletionCron, dailyCountDeletion };
