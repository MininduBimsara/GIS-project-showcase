const express = require("express");
const router = express.Router();
const projectController = require("../controller/ProjectController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Public routes
router.get("/", projectController.getAllProjects);
router.get("/:id", projectController.getProjectById);

// Protected routes (require authentication)
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  projectController.createProject
);
router.put(
  ":id",
  authMiddleware,
  upload.single("image"),
  projectController.updateProject
);
router.delete("/:id", authMiddleware, projectController.deleteProject);

module.exports = router;
