import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/Users";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Signup route
app.post("/api/signup", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
  
      // Check if the user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        res.status(400).json({ success: false, message: "Username already exists" });
        return;
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Save the new user to the database
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
  
       res.status(201).json({ success: true, message: "User registered successfully!" });
       return;
    } catch (error) {
       res.status(500).json({ success: false, message: "Error signing up", error });
       return;
    }
  });
  
// Login route
app.post("/api/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
        res.status(400).json({ message: "Invalid username or password" });
        return;
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
       res.status(400).json({ message: "Invalid username or password" });
       return;
    }

    // Generate a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
