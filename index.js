import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const connectWithRetry = () => {
  return mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("database connected successfully");
    })
    .catch((error) => {
      console.log("Error connecting database, retry after 5 seconds", error);
      setTimeout(connectWithRetry, 5000);
    });
};
connectWithRetry();

const app = express();
app.use(express.json());

app.use(cors({ origin: "*" }));

app.listen(process.env.PORT, () => {
  console.log(
    `server is listening on port http://localhost:${process.env.PORT}`
  );
});

app.get("/", (req, res) => {
  res.status(200).send("Home page");
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
