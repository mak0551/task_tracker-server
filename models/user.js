import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  country: String,
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
});

export const User = mongoose.model("User", userSchema);
