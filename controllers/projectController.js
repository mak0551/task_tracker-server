import { project } from "../models/project.js";
import { User } from "../models/user.js";

export const createProject = async (req, res) => {
  const userId = req.user.id;
  const { title } = req.body;

  try {
    const user = await User.findById(userId).populate("projects");
    if (user.projects.length >= 4) {
      return res
        .status(400)
        .json({ message: "You can only create up to 4 projects." });
    }

    const newProject = await project.create({ title, user: userId });
    user.projects.push(newProject._id);
    await user.save();

    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProjects = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId).populate("projects");
    if (user.projects.length < 1) {
      return res.status(404).json({ message: " no recods found" });
    }
    res.status(200).json(user.projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProject = async (req, res) => {
  const userId = req.user.id;
  const projectId = req.params.projectId;
  const { title } = req.body;

  try {
    const projectToUpdate = await project.findOne({
      _id: projectId,
      user: userId,
    });
    if (!projectToUpdate) {
      return res.status(404).json({ message: "Project not found." });
    }

    projectToUpdate.title = title;
    await projectToUpdate.save();

    res.status(200).json(projectToUpdate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteProject = async (req, res) => {
  const userId = req.user.id;
  const projectId = req.params.projectId;

  try {
    const projectToDelete = await project.findOneAndDelete({
      _id: projectId,
      user: userId,
    });
    if (!projectToDelete) {
      return res
        .status(404)
        .json({ message: "Project not found or unauthorized." });
    }

    await User.findByIdAndUpdate(userId, { $pull: { projects: projectId } });

    res.status(200).json({ message: "Project deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
