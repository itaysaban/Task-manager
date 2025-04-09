import { Request, Response, Express } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/Users";

export const useAuthRoutes = (app: Express) => {
  // Signup route
  app.post("/api/signup", async (req: Request, res: Response) => {
    try {
      const { username, password, confirmPassword } = req.body;
      
      if (password.length < 8) {
          res.status(400).json({
          success: false,
          message: "Password must be at least 8 characters long.",
        })
        return;
      }
  
      if (!/\d/.test(password)) {
          res.status(400).json({
          success: false,
          message: "Password must contain at least one digit.",
        })
      return;
      }
  
      if (!/[A-Z]/.test(password)) {
          res.status(400).json({
          success: false,
          message: "Password must contain at least one uppercase letter.",
        })
        return;
      }

      if (password !== confirmPassword){
        res.status(400).json({
          success: false,
          message: "Passwords do not match.",
        })
        return;
      }

      const englishLettersRegex = /^[A-Za-z]+$/;
      if (!englishLettersRegex.test(password)){
        res.status(400).json({
          success: false,
          message: "Password contains non-english letters"
        })
      }
      
      // Check if the user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        res
          .status(400)
          .json({ success: false, message: "Username already exists" });
        return;
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Save the new user to the database
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();

      res
        .status(201)
        .json({ success: true, message: "User registered successfully!" });
      return;
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error signing up", error });
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
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
        expiresIn: "15m",
      });

      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      res.status(500).json({ message: "Error logging in", error });
    }
  });
};
