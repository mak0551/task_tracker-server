import { project } from "../models/project.js";
import { task } from "../models/task.js";

export const createTask = async (req, res) => {
  const { projectId } = req.params;
  const { title, description, status } = req.body;

  try {
    const Task = await task.create({
      title,
      description,
      status,
      createdAt: new Date(),
      project: projectId,
    });

    const Project = await project.findById(projectId);
    Project.tasks.push(Task._id);
    await Project.save();

    res.status(200).json(Task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;
    const tasks = await task.find({ project: projectId });
    if (tasks.length < 1)
      return res.status(404).json({ message: "no records found" });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, status } = req.body;
    const update = {
      title,
      description,
      status,
      completedAt: status === "completed" ? new Date() : undefined,
    };
    const findtask = await task.findById(taskId);
    if (!findtask) return res.status(404).json({ message: "no records found" });
    const Task = await task.findByIdAndUpdate(taskId, update, { new: true });
    res.status(200).json(Task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const findtask = await task.findById(taskId);
    if (!findtask) return res.status(404).json({ message: "no records found" });
    const Project = await project.findById(findtask.project);
    Project.tasks.pull(findtask._id);
    await Project.save();
    await task.findByIdAndDelete(findtask._id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
