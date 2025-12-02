import express from "express";
import { 
  getActiveCartforUser,
  addItemToCart,
  updateItemInCart,
  deleteItemInCart,
  clearCart,
  checkout
} from "../services/cartService.js";

import validateJWT from "../middlewares/validateJWT.js";
import type { ExtendRequest } from "../types/extendedRequests.js";

const router = express.Router();

router.get("/", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user._id;
    const cart = await getActiveCartforUser({ userId, populateProduct: true });
    res.status(200).send(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).send("Server error while fetching cart");
  }
});

router.post("/items", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?.id;
    const { productId, quantity } = req.body;
    const response = await addItemToCart({ userId, productId, quantity });
    res.status(response.statusCode ?? 200).send(response.data);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).send("Server error while adding item");
  }
});

router.put("/items", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?.id;
    const { productId, quantity } = req.body;
    const response = await updateItemInCart({ userId, productId, quantity });
    res.status(response.statusCode ?? 200).send(response.data);
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).send("Server error while updating item");
  }
});

router.delete("/items/:productId", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const response = await deleteItemInCart({ userId, productId });

    if (!response) {
      return res.status(500).send("Internal error");
    }

    res.status(response.statusCode ?? 200).send(response.data);
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).send("Server error while deleting item");
  }
});

router.delete("/", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?.id;
    const response = await clearCart({ userId });
    res.status(response.statusCode ?? 200).send(response.data);
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).send("Server error while clearing cart");
  }
});
router.get("/checkout", (req, res) => {
  res.status(200).send({ message: "Checkout endpoint active" });
});
router.post("/checkout", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { address } = req.body;
    const response = await checkout({ userId, address });
    res.status(response.statusCode ?? 200).send(response.data);
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).send("Server error during checkout");
  }
});

export default router;
