import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import { task } from "../models/task.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("accessToken", token, { httpOnly: true });
    res.status(201).json({ token, user: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT secret not configured" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      // expiresIn: "7d",
    });
    const cookieOptions = {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    };
    res.cookie("accessToken", token, cookieOptions);
    const safeUser = user.toObject();
    delete safeUser.password;
    res.json({
      token,
      user: safeUser,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getbyid = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// export const getallusers = async (req, res) => {
//   try {
//     const findusers = await User.find();
//     if (findusers.length < 1) {
//       return res.status(404).json({
//         message: "no records found"
//       })
//     }
//     res.status(200).json(findusers)
//   } catch (err) {
//     res.status(500).json({ message: 'internal server error' })
//   }
// }

// export const getbyuser = async (req, res) => {
//   try {
//     const id = req.params.id
//     const findusers = await task.find({ userId: id });
//     if (findusers.length < 1) {
//       return res.status(404).json({
//         message: "no records found"
//       })
//     }
//     res.status(200).json({ count: findusers.length, findusers })
//   } catch (err) {
//     res.status(500).json({ message: 'internal server error' })
//   }
// }