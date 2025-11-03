const mongoose = require("mongoose");
const ProjectEn = require("../models/ProjectEn");
const ProjectSi = require("../models/ProjectSi");
const ProjectTa = require("../models/ProjectTa");
const { translateText } = require("../services/translationService");

const getModelByLang = (lang) => {
  const l = (lang || "en").toLowerCase();
  if (l === "si") return ProjectSi;
  if (l === "ta") return ProjectTa;
  return ProjectEn;
};

// GET /api/projects - Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const Model = getModelByLang(req.query.lang);
    const projects = await Model.find().populate("createdBy", "name email");
    res.json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to retrieve projects",
      message: error.message,
    });
  }
};

// GET /api/projects/:id - Get single project
exports.getProjectById = async (req, res) => {
  try {
    const Model = getModelByLang(req.query.lang);
    const project = await Model.findOne({ groupId: req.params.id }).populate(
      "createdBy",
      "name email"
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        error: "Project not found",
      });
    }

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to retrieve project",
      message: error.message,
    });
  }
};

// POST /api/projects - Create new project
exports.createProject = async (req, res) => {
  try {
    const { title, description, imageUrl, projectUrl } = req.body;

    if (!title || !description || !imageUrl) {
      return res.status(400).json({
        success: false,
        error: "Please provide title, description, and imageUrl",
      });
    }

    const groupId = new mongoose.Types.ObjectId();

    // Create English first
    const en = await ProjectEn.create({
      groupId,
      title,
      description,
      imageUrl,
      projectUrl: projectUrl || "",
      createdBy: req.user.id,
    });

    // Translate and create Sinhala & Tamil
    const [titleSi, descSi] = await Promise.all([
      translateText(title, "si"),
      translateText(description, "si"),
    ]);
    const [titleTa, descTa] = await Promise.all([
      translateText(title, "ta"),
      translateText(description, "ta"),
    ]);

    await Promise.all([
      ProjectSi.create({
        groupId,
        title: titleSi,
        description: descSi,
        imageUrl,
        projectUrl: projectUrl || "",
        createdBy: req.user.id,
      }),
      ProjectTa.create({
        groupId,
        title: titleTa,
        description: descTa,
        imageUrl,
        projectUrl: projectUrl || "",
        createdBy: req.user.id,
      }),
    ]);

    const populatedEn = await ProjectEn.findById(en._id).populate(
      "createdBy",
      "name email"
    );

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: { groupId, project: populatedEn },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to create project",
      message: error.message,
    });
  }
};

// PUT /api/projects/:id - Update project
exports.updateProject = async (req, res) => {
  try {
    const { title, description, imageUrl, projectUrl } = req.body;
    const groupId = req.params.id;

    const en = await ProjectEn.findOne({ groupId });
    if (!en) {
      return res
        .status(404)
        .json({ success: false, error: "Project not found" });
    }

    // Update EN
    if (title !== undefined) en.title = title;
    if (description !== undefined) en.description = description;
    if (imageUrl !== undefined) en.imageUrl = imageUrl;
    if (projectUrl !== undefined) en.projectUrl = projectUrl;
    await en.save();

    // Re-translate if title/description changed
    if (title !== undefined || description !== undefined) {
      const [titleSi, descSi] = await Promise.all([
        translateText(en.title, "si"),
        translateText(en.description, "si"),
      ]);
      const [titleTa, descTa] = await Promise.all([
        translateText(en.title, "ta"),
        translateText(en.description, "ta"),
      ]);

      await Promise.all([
        ProjectSi.findOneAndUpdate(
          { groupId },
          {
            title: titleSi,
            description: descSi,
            ...(imageUrl !== undefined ? { imageUrl } : {}),
            ...(projectUrl !== undefined ? { projectUrl } : {}),
          }
        ),
        ProjectTa.findOneAndUpdate(
          { groupId },
          {
            title: titleTa,
            description: descTa,
            ...(imageUrl !== undefined ? { imageUrl } : {}),
            ...(projectUrl !== undefined ? { projectUrl } : {}),
          }
        ),
      ]);
    } else if (imageUrl !== undefined || projectUrl !== undefined) {
      // Only propagate non-text fields
      await Promise.all([
        ProjectSi.findOneAndUpdate(
          { groupId },
          {
            ...(imageUrl !== undefined ? { imageUrl } : {}),
            ...(projectUrl !== undefined ? { projectUrl } : {}),
          }
        ),
        ProjectTa.findOneAndUpdate(
          { groupId },
          {
            ...(imageUrl !== undefined ? { imageUrl } : {}),
            ...(projectUrl !== undefined ? { projectUrl } : {}),
          }
        ),
      ]);
    }

    const updated = await ProjectEn.findOne({ groupId }).populate(
      "createdBy",
      "name email"
    );

    res.json({
      success: true,
      message: "Project updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to update project",
      message: error.message,
    });
  }
};

// DELETE /api/projects/:id - Delete project
exports.deleteProject = async (req, res) => {
  try {
    const groupId = req.params.id;
    const en = await ProjectEn.findOne({ groupId });
    if (!en) {
      return res
        .status(404)
        .json({ success: false, error: "Project not found" });
    }

    await Promise.all([
      ProjectEn.deleteOne({ groupId }),
      ProjectSi.deleteOne({ groupId }),
      ProjectTa.deleteOne({ groupId }),
    ]);

    res.json({
      success: true,
      message: "Project deleted successfully",
      data: { groupId },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to delete project",
      message: error.message,
    });
  }
};
