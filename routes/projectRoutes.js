import express from "express";
import { auth } from "../middleware.js/authMiddleware.js";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../controllers/projectController.js";
const router = express.Router();

// Project routes
router.post("/post", auth, createProject); // POST /api/projects
router.get("/get", auth, getProjects);
router.put("/put", updateProject);
router.delete("/delete", deleteProject);

export default router;
