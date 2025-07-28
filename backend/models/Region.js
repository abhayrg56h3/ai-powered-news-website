import mongoose from "mongoose";

const RegionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // ensures no duplicate region names
      trim: true,
    },
    flagEmoji: {
      type: String,
      default: "🌍", // optional visual for UI
    },
    priority: {
      type: Number,
      default: 0, // use for sorting in UI
    },
    articleCount: {
      type: Number,
      default: 0, // optional, update manually if needed
    },
  },
  { timestamps: true }
);

// Create the Region model
const Region = mongoose.model("Region", RegionSchema);

// Export the model
export default Region;
