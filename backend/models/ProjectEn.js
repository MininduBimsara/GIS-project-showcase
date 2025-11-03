const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true, trim: true },
    projectUrl: { type: String, trim: true, default: "" },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lang: { type: String, enum: ["en"], default: "en" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProjectEn", projectSchema, "projects_en");
