import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User";
import dotenv from "dotenv";

dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI!);

  const exists = await User.findOne({ username: "admin" });
  if (exists) {
    console.log("Admin already exists");
    process.exit();
  }

  const hashed = await bcrypt.hash("admin123", 10);

  await User.create({
    username: "admin",
    password: hashed,
    role: "admin",
  });

  console.log("Admin user created");
  process.exit();
}

seed();
