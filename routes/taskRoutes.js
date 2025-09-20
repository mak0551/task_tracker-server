import express from "express";
import { task } from "../models/task.js";
const router = express.Router();

// Task routes
router.post("/add", async (req, res) => {
  try {
    const { date } = req.body;
    const tasks = req.body;
    const user = req.user;
    console.log(user);
    const Task = await task.findOne({ date });
    if (Task) {
      Task.set(tasks);
      await Task.save();
    } else {
      Task = await task.create({ date, ...tasks, userId: req.user.id });
    }
    res.status(201).json(Task);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "internal server error", message: err.message });
  }
});

// Get tasks by date
router.get("/getbydate/:date", async (req, res) => {
  try {
    const { date } = req.params;
    const Task = await task.findOne({ date });
    if (!Task) {
      return res
        .status(404)
        .json({ error: "Task not found for the given date" });
    }
    res.status(200).json(Task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get task by ID
router.get("/getbyid/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const Task = await task.findById(id);
    if (!Task) {
      return res.status(404).json({ error: "No Recods Found" });
    }
    res.status(200).json(Task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get all tasks by user
router.get("/getall", async (req, res) => {
  try {
    const tasks = await task.find({ userId: req.user.id }).sort({ date: -1 });
    if (tasks.length === 0) {
      return res.status(404).json({ error: "No Records Found" });
    }
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
