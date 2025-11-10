import express from 'express';
import { getAllProducts } from '../services/productService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

export default router;
