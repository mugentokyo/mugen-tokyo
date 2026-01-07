import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import itemRoutes from "./routes/items";
import purchaseRoutes from "./routes/purchases";
import poRoutes from "./routes/po";
import user from "./routes/users";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/auth", authRoutes);
app.use("/items", itemRoutes);
app.use("/purchases", purchaseRoutes);
app.use("/po", poRoutes);
app.use("/users", user);

export default app;
