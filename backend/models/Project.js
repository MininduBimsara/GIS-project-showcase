const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a project title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a project description"],
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, "Please provide an image URL"],
      trim: true,
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);
