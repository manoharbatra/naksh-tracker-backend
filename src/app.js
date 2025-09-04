import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import classCategoryRoutes from "./routes/classCategoryRoutes.js";
import classDataRoutes from "./routes/classDataRoutes.js";
import { errorHandler } from "./middlewares/error.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🚫 Disable caching
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Surrogate-Control", "no-store");
  next();
});

// routes
app.use("/api/class-categories", classCategoryRoutes);      // user-selected
app.use("/api/class-data", classDataRoutes);              // user data

export default app;

// Error Handling Middleware
app.use(errorHandler);