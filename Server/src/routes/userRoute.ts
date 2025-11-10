import express from "express";
import { login, register } from "../services/userService.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { firstName, email, lastName, password } = req.body;
    const { statusCode, data } = await register({ firstName, lastName, email, password });
    res.status(statusCode).send(data);
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).send("Server error during registration");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { statusCode, data } = await login({ email, password });
    res.status(statusCode).send(data);
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).send("Server error during login");
  }
});

export default router;
