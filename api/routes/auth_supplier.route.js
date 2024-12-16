import express from 'express';
import { signupSupplier } from '../controllers/auth_supplier.controller.js';
 
 
 
const router = express.Router();

router.post('/signup_supplier',  signupSupplier);

export default router;
