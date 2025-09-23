import express from "express";
import { getbyid, login, signup } from "../controllers/authController.js";
const router = express.Router();

// Auth routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/getbyid/:id", getbyid);

export default router;
