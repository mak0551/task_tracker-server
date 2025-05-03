import express from "express";
import { auth } from "../middleware.js/authMiddleware.js";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/taskController.js";
const router = express.Router();

// Task routes
router.post("/:projectId", auth, createTask); // POST /api/tasks/:projectId
router.get("/:projectId", auth, getTasks); // GET  /api/tasks/:projectId
router.put("/:taskId", auth, updateTask); // PUT  /api/tasks/:taskId
router.delete("/:taskId", auth, deleteTask); // DELETE /api/tasks/:taskId

export default router;
