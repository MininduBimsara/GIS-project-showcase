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

// ✅ Safe translation helper with fallback
const safeTranslate = async (text, lang) => {
  try {
    if (!text) return text;
    const translated = await translateText(text, lang);
    if (
      !translated ||
      typeof translated !== "string" ||
      translated.trim() === ""
    ) {
      console.warn(
        `⚠️ Translation for ${lang} returned empty or invalid. Using fallback.`
      );
      return text; // fallback to English
    }
    return translated;
  } catch (err) {
    console.error(`⚠️ Translation failed for ${lang}:`, err.message);
    return text; // fallback to English
  }
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
      projectUrl,
      department,
      location,
      year,
      status,
    } = req.body;

    // Multer will provide req.file if an image was uploaded
    let imageUrl = req.body.imageUrl;
    if (req.file) {
      // Store absolute URL so frontend doesn't need to infer origin
      const host = req.get("host");
      const protocol = req.protocol; // will be https if behind proxy & trust proxy enabled
      imageUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
    }

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
          "Please provide title, description, image, department, location, year, and status",
      });
    }

    const groupId = new mongoose.Types.ObjectId();

    // Create English version
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

    // ✅ Use safeTranslate with fallback
    const [titleSi, descSi, deptSi] = await Promise.all([
      safeTranslate(title, "si"),
      safeTranslate(description, "si"),
      safeTranslate(department, "si"),
    ]);
    const [titleTa, descTa, deptTa] = await Promise.all([
      safeTranslate(title, "ta"),
      safeTranslate(description, "ta"),
      safeTranslate(department, "ta"),
    ]);

    // Create Sinhala and Tamil versions
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
    console.error("❌ Project creation failed:", error);
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
      projectUrl,
      department,
      location,
      year,
      status,
    } = req.body;
    const groupId = req.params.id;

    // Multer will provide req.file if an image was uploaded
    let imageUrl = req.body.imageUrl;
    if (req.file) {
      const host = req.get("host");
      const protocol = req.protocol;
      imageUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
    }

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

    // ✅ Re-translate safely
    if (
      title !== undefined ||
      description !== undefined ||
      department !== undefined
    ) {
      const [titleSi, descSi, deptSi] = await Promise.all([
        safeTranslate(en.title, "si"),
        safeTranslate(en.description, "si"),
        safeTranslate(en.department, "si"),
      ]);
      const [titleTa, descTa, deptTa] = await Promise.all([
        safeTranslate(en.title, "ta"),
        safeTranslate(en.description, "ta"),
        safeTranslate(en.department, "ta"),
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
    } else {
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
    console.error("❌ Project update failed:", error);
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
    console.error("❌ Project deletion failed:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete project",
      message: error.message,
    });
  }
};
