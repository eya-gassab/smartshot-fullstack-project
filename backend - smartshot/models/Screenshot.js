const mongoose = require("mongoose");

const screenshotSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
    },
    extractedText: {
      type: String,
      default: "",
    },
    aiSummary: {
      type: String,
      default: "",
    },
    aiCategory: {
      type: String,
      enum: ["programming","finance","social_media","shopping","education","work","personal","other"],
      default: "other",
    },
    detectedLinks: [String],
    detectedTasks: [String],
    reminderDate: {
      type: Date,
    },
    isProcessed: {
      type: Boolean,
      default: false,
    },
    tags: [String],
    isFavorite: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
  },
  { timestamps: true },
);

screenshotSchema.index({ extractedText: "text", title: "text" });

module.exports = mongoose.model("Screenshot", screenshotSchema);
