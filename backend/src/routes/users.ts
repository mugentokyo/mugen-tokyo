import mongoose from "mongoose";
import express from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/", async (_req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

router.post("/", async (req, res) => {
  const { username, password, role } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    password: hashed,
    role,
  });

  res.json(user);
});


export default router;