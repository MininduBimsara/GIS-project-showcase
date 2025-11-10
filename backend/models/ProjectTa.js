const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 2000,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
      // Accept full URLs (with or without explicit port like :5000)
      match: [/^https?:\/\/.+/, "Invalid image URL"],
    },
    department: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    location: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    year: {
      type: String,
      required: true,
      trim: true,
      match: /^\d{4}$/,
    },
    status: {
      type: String,
      required: true,
      trim: true,
      enum: ["completed", "in-progress", "planned"],
    },
    projectUrl: {
      type: String,
      trim: true,
      default: "",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lang: { type: String, enum: ["ta"], default: "ta" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProjectTa", projectSchema, "projects_ta");
