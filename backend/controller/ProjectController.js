const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const DATA_FILE = path.join(__dirname, "../data/projects.json");

// Helper function to read projects from file
const readProjects = async () => {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      // File doesn't exist, create it with empty array
      await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
      await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));
      return [];
    }
    throw error;
  }
};

// Helper function to write projects to file
const writeProjects = async (projects) => {
  await fs.writeFile(DATA_FILE, JSON.stringify(projects, null, 2));
};

// Validation helper
const validateProject = (project) => {
  const { title, description, imageUrl, projectUrl } = project;
  const errors = [];

  if (!title || title.trim().length === 0) {
    errors.push("Title is required");
  }
  if (!description || description.trim().length === 0) {
    errors.push("Description is required");
  }
  if (!imageUrl || imageUrl.trim().length === 0) {
    errors.push("Image URL is required");
  }

  return errors;
};

// GET /api/projects - Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await readProjects();
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
    const projects = await readProjects();
    const project = projects.find((p) => p.id === req.params.id);

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

    // Validate input
    const errors = validateProject(req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: errors,
      });
    }

    const projects = await readProjects();

    const newProject = {
      id: uuidv4(),
      title: title.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      projectUrl: projectUrl ? projectUrl.trim() : "",
      createdAt: new Date().toISOString(),
    };

    projects.push(newProject);
    await writeProjects(projects);

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: newProject,
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

    // Validate input
    const errors = validateProject(req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: errors,
      });
    }

    const projects = await readProjects();
    const projectIndex = projects.findIndex((p) => p.id === req.params.id);

    if (projectIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Project not found",
      });
    }

    const updatedProject = {
      ...projects[projectIndex],
      title: title.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      projectUrl: projectUrl ? projectUrl.trim() : "",
      updatedAt: new Date().toISOString(),
    };

    projects[projectIndex] = updatedProject;
    await writeProjects(projects);

    res.json({
      success: true,
      message: "Project updated successfully",
      data: updatedProject,
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
    const projects = await readProjects();
    const projectIndex = projects.findIndex((p) => p.id === req.params.id);

    if (projectIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Project not found",
      });
    }

    const deletedProject = projects[projectIndex];
    projects.splice(projectIndex, 1);
    await writeProjects(projects);

    res.json({
      success: true,
      message: "Project deleted successfully",
      data: deletedProject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to delete project",
      message: error.message,
    });
  }
};
