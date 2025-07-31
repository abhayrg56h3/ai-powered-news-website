
import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  url: { type: String, required: true, unique: true, index: true }
}, { timestamps: true });

export default mongoose.model('Url', urlSchema);
