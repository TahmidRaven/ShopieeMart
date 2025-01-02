import express from 'express';
import { signupSeller, signinSeller } from '../controllers/auth_seller.controller.js';

const router = express.Router();

router.post('/signup_seller', signupSeller);
router.post('/signin_seller', signinSeller);

export default router;
