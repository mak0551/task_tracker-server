import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true }
);

export const project = mongoose.model("Project", projectSchema);
