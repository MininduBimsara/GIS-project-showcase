const express = require("express");
const router = express.Router();
const projectController = require("../controller/ProjectController");
const authMiddleware = require("../middleware/authMiddleware");

// Public routes
router.get("/", projectController.getAllProjects);
router.get("/:id", projectController.getProjectById);

// Protected routes (require authentication)
router.post("/", authMiddleware, projectController.createProject);
router.put("/:id", authMiddleware, projectController.updateProject);
router.delete("/:id", authMiddleware, projectController.deleteProject);

module.exports = router;
