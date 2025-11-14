import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import { seedInstialProducts } from "./services/productService.js";
import productRoute from "./routes/productRoute.js"
import cartRoute from "./routes/cartRoute.js"
import cors from "cors"
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors())
mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Hello, E-commerce API!");
});

seedInstialProducts()
app.use('/user', userRoute);
app.use('/product',productRoute);
app.use('/cart',cartRoute);
app.use('/cart',cartRoute)
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
