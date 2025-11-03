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
    const {
      title,
      description,
      imageUrl,
      projectUrl,
      department,
      location,
      year,
      status,
    } = req.body;

    if (
      !title ||
      !description ||
      !imageUrl ||
      !department ||
      !location ||
      !year ||
      !status
    ) {
      return res.status(400).json({
        success: false,
        error:
          "Please provide title, description, imageUrl, department, location, year, and status",
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
      department,
      location,
      year,
      status,
      createdBy: req.user.id,
    });

    // Translate and create Sinhala & Tamil (including department)
    const [titleSi, descSi, deptSi] = await Promise.all([
      translateText(title, "si"),
      translateText(description, "si"),
      translateText(department, "si"),
    ]);
    const [titleTa, descTa, deptTa] = await Promise.all([
      translateText(title, "ta"),
      translateText(description, "ta"),
      translateText(department, "ta"),
    ]);

    await Promise.all([
      ProjectSi.create({
        groupId,
        title: titleSi,
        description: descSi,
        imageUrl,
        projectUrl: projectUrl || "",
        department: deptSi,
        location,
        year,
        status,
        createdBy: req.user.id,
      }),
      ProjectTa.create({
        groupId,
        title: titleTa,
        description: descTa,
        imageUrl,
        projectUrl: projectUrl || "",
        department: deptTa,
        location,
        year,
        status,
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
    const {
      title,
      description,
      imageUrl,
      projectUrl,
      department,
      location,
      year,
      status,
    } = req.body;
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
    if (department !== undefined) en.department = department;
    if (location !== undefined) en.location = location;
    if (year !== undefined) en.year = year;
    if (status !== undefined) en.status = status;
    await en.save();

    // Re-translate if title/description/department changed
    if (
      title !== undefined ||
      description !== undefined ||
      department !== undefined
    ) {
      const [titleSi, descSi, deptSi] = await Promise.all([
        translateText(en.title, "si"),
        translateText(en.description, "si"),
        translateText(en.department, "si"),
      ]);
      const [titleTa, descTa, deptTa] = await Promise.all([
        translateText(en.title, "ta"),
        translateText(en.description, "ta"),
        translateText(en.department, "ta"),
      ]);

      await Promise.all([
        ProjectSi.findOneAndUpdate(
          { groupId },
          {
            title: titleSi,
            description: descSi,
            department: deptSi,
            ...(imageUrl !== undefined ? { imageUrl } : {}),
            ...(projectUrl !== undefined ? { projectUrl } : {}),
            ...(location !== undefined ? { location } : {}),
            ...(year !== undefined ? { year } : {}),
            ...(status !== undefined ? { status } : {}),
          }
        ),
        ProjectTa.findOneAndUpdate(
          { groupId },
          {
            title: titleTa,
            description: descTa,
            department: deptTa,
            ...(imageUrl !== undefined ? { imageUrl } : {}),
            ...(projectUrl !== undefined ? { projectUrl } : {}),
            ...(location !== undefined ? { location } : {}),
            ...(year !== undefined ? { year } : {}),
            ...(status !== undefined ? { status } : {}),
          }
        ),
      ]);
    } else if (
      imageUrl !== undefined ||
      projectUrl !== undefined ||
      department !== undefined ||
      location !== undefined ||
      year !== undefined ||
      status !== undefined
    ) {
      // Only propagate non-text fields
      await Promise.all([
        ProjectSi.findOneAndUpdate(
          { groupId },
          {
            ...(imageUrl !== undefined ? { imageUrl } : {}),
            ...(projectUrl !== undefined ? { projectUrl } : {}),
            ...(department !== undefined ? { department } : {}),
            ...(location !== undefined ? { location } : {}),
            ...(year !== undefined ? { year } : {}),
            ...(status !== undefined ? { status } : {}),
          }
        ),
        ProjectTa.findOneAndUpdate(
          { groupId },
          {
            ...(imageUrl !== undefined ? { imageUrl } : {}),
            ...(projectUrl !== undefined ? { projectUrl } : {}),
            ...(department !== undefined ? { department } : {}),
            ...(location !== undefined ? { location } : {}),
            ...(year !== undefined ? { year } : {}),
            ...(status !== undefined ? { status } : {}),
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
