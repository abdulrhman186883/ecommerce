import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import { seedInstialProducts } from "./services/productService.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import cors from "cors";

const app = express();

// Use PORT from environment OR fallback to 3001
const PORT = process.env.PORT || 3001;

app.use(express.json());

// ✅ FIXED CORS — ALLOW LOCAL + VERCEL FRONTEND
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Local Vite
      "https://ecommerce-black-five-73.vercel.app", // Your Vercel production domain
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");

    // Only seed after database is connected
    seedInstialProducts();
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

app.get("/", (req, res) => {
  res.json({ message: "E-commerce API is running!" });
});

app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
