import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import itemRoutes from "./routes/items";
import purchaseRoutes from "./routes/purchases";
import poRoutes from "./routes/po";
import user from "./routes/users";

const app = express();

// middleware
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://mugen-tokyo.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());

// routes
app.use("/auth", authRoutes);
app.use("/items", itemRoutes);
app.use("/purchases", purchaseRoutes);
app.use("/po", poRoutes);
app.use("/users", user);

export default app;
