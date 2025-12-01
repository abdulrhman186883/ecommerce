import express from "express";
import type { Request, Response } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService.js";

import validateJWT from "../middlewares/validateJWT.js";
import { isAdmin } from "../middlewares/IsAdmin.js";

const router = express.Router();

// ---------------------------
// 🚀 PUBLIC ROUTES
// ---------------------------

// GET ALL PRODUCTS
router.get("/", async (_req: Request, res: Response) => {
  try {
    const products = await getAllProducts();
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ message: "Failed to fetch products" });
  }
});

// GET SINGLE PRODUCT BY ID
router.get("/:id", async (req: Request<{ id: string }>, res: Response) => {
  try {
    const product = await getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ message: "Failed to fetch product" });
  }
});



// CREATE PRODUCT — ADMIN
router.post(
  "/admin/create",
  validateJWT,
  isAdmin,
  async (
    req: Request<{}, {}, any>, // body typing optional for now
    res: Response
  ) => {
    try {
      const newProduct = await createProduct(req.body);
      return res.status(201).json(newProduct);
    } catch (error) {
      console.error("Error creating product:", error);
      return res.status(500).json({ message: "Failed to create product" });
    }
  }
);

// UPDATE PRODUCT — ADMIN
router.put(
  "/admin/update/:id",
  validateJWT,
  isAdmin,
  async (req: Request<{ id: string }, {}, any>, res: Response) => {
    try {
      const updated = await updateProduct(req.params.id, req.body);

      if (!updated) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.status(200).json(updated);
    } catch (error) {
      console.error("Error updating product:", error);
      return res.status(500).json({ message: "Failed to update product" });
    }
  }
);

// DELETE PRODUCT — ADMIN
router.delete(
  "/admin/delete/:id",
  validateJWT,
  isAdmin,
  async (req: Request<{ id: string }>, res: Response) => {
    try {
      const deleted = await deleteProduct(req.params.id);

      if (!deleted) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      return res.status(500).json({ message: "Failed to delete product" });
    }
  }
);

export default router;
