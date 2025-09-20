import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    date: { type: String, required: true }, // e.g. "2025-09-17"
    fajr: {
      done: { type: Boolean, default: false },
      comment: { type: String, default: "" },
    },
    zuhr: {
      done: { type: Boolean, default: false },
      comment: { type: String, default: "" },
    },
    asr: {
      done: { type: Boolean, default: false },
      comment: { type: String, default: "" },
    },
    maghrib: {
      done: { type: Boolean, default: false },
      comment: { type: String, default: "" },
    },
    isha: {
      done: { type: Boolean, default: false },
      comment: { type: String, default: "" },
    },
    tahajjud: {
      done: { type: Boolean, default: false },
      comment: { type: String, default: "" },
    },
    asmaulhusna: {
      done: { type: Boolean, default: false },
      comment: { type: String, default: "" },
    },
    dalailulkhairat: {
      done: { type: Boolean, default: false },
      comment: { type: String, default: "" },
    },
    muraqaba: {
      done: { type: Boolean, default: false },
      comment: { type: String, default: "" },
    },
    tasawwureshaikh: {
      done: { type: Boolean, default: false },
      comment: { type: String, default: "" },
    },
    duroodCount: {
      done: { type: Boolean, default: false },
      comment: { type: String, default: "" },
    },
    other: {
      comment: { type: String, default: "" },
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const task = mongoose.model("Task", taskSchema);
