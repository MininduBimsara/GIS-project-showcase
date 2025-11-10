const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const projectController = require("../controller/ProjectController");
const upload = require("../middleware/uploadMiddleware");

// All admin routes require authentication
router.use(authMiddleware);

// Project Management Routes
router.get("/projects", projectController.getAllProjects);
router.get("/projects/:id", projectController.getProjectById);
router.post(
  "/projects",
  upload.single("image"),
  projectController.createProject
);
router.put(
  "/projects/:id",
  upload.single("image"),
  projectController.updateProject
);
router.delete("/projects/:id", projectController.deleteProject);

// TODO: Add these routes for future admin panel implementation
// User Management Routes (to be implemented)
// router.get("/users", adminController.getAllUsers);
// router.get("/users/:id", adminController.getUserById);
// router.put("/users/:id", adminController.updateUser);
// router.delete("/users/:id", adminController.deleteUser);

// Dashboard Statistics (to be implemented)
// router.get("/dashboard/stats", adminController.getDashboardStats);

// Activity Logs (to be implemented)
// router.get("/logs", adminController.getActivityLogs);

module.exports = router;
