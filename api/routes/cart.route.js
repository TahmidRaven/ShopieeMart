import express from 'express';
import { addToCart } from '../controllers/cart.controller.js';

const router = express.Router();

// Route to add product to the cart
router.post('/add', addToCart);

export default router;
