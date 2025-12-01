import express, { response } from "express";
import { login, register , getMyOrders } from "../services/userService.js";
import validateJWT from "../middlewares/validateJWT.js";

import type {ExtendRequest}  from "../types/extendedRequests.js"
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { firstName, email, lastName, password } = req.body;
    const { statusCode, data } = await register({ firstName, lastName, email, password });
    res.status(statusCode).json({ data });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).send("Server error during registration");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { statusCode, data } = await login({ email, password });

    if (statusCode !== 200) {
      return res.status(statusCode).json({ data });
    }

    res.status(200).json({
      data: data.token,
      role: data.role
    });

  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).send("Server error during login");
  }
});


router.get('/myorders', validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user?._id;

    const { statusCode, data } = await getMyOrders({ userId });

    return res.status(statusCode).json(data);  // <-- FIXED
  } catch (error) {
    console.error("MyOrders error:", error);
    return res.status(500).send("Something is wrong");
  }
});

export default router;
