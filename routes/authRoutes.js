import express from "express";
import { getbyid, login, signup } from "../controllers/authController.js";
const router = express.Router();

// Auth routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/getbyid/:id", getbyid);
// router.get("/getall", getallusers);
// router.get("/gettasksbyid/:id", getbyuser)

export default router;
