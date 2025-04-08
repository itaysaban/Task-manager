import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { useAuthRoutes } from "./routes/auth";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;

// Setup routes
const app = express();
app.use(express.json());
app.use(cors());

useAuthRoutes(app);

// Basic route
app.get("/", (req: Request, res: Response) => {
  res.send("Task Manager API is running...");
});

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {} as mongoose.ConnectOptions)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
