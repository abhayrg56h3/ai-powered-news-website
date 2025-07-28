import mongoose from "mongoose";

const SourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // ensures no duplicate source names
      trim: true,
    },
    logoUrl: {
      type: String,
      default: "", // optional logo for UI display
    },
    priority: {
      type: Number,
      default: 0, // for sorting preference
    },
    articleCount: {
      type: Number,
      default: 0, // number of articles from this source
    },
  },
  { timestamps: true }
);

const Source = mongoose.model("Source", SourceSchema);

export default Source;
