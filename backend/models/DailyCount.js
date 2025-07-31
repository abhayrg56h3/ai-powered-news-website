import mongoose from "mongoose";
const DailyCountSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
});

const DailyCount= mongoose.model('DailyCount', DailyCountSchema);


export default DailyCount;