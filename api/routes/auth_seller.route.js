import express from 'express';
import { signupSeller } from '../controllers/auth_seller.controller.js';
 
 
const router = express.Router();

router.post('/signup_seller',  signupSeller);

export default router;
