import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";

const router = express.Router();

/**
 * LOGIN
 */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username dan password wajib diisi",
    });
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: "User tidak ditemukan" });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ message: "Password salah" });
  }

  // TANPA JWT
  res.json({
    message: "Login berhasil",
    user: {
      id: user._id,
      username: user.username,
      role: user.role,
    },
  });
});

/**
 * REGISTER USER (ADMIN ONLY)
 */
router.post("/register", async (req, res) => {
  const { username, password, adminSecret } = req.body;

  if (adminSecret !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ message: "Forbidden" });
  }

  if (!username || !password) {
    return res.status(400).json({
      message: "Username dan password wajib diisi",
    });
  }

  const hashed = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      username,
      password: hashed,
      role: "user",
    });

    res.json({
      message: "User berhasil dibuat",
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (err: any) {
    res.status(400).json({
      message: "Username sudah digunakan",
    });
  }
});

export default router;