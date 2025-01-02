import express from 'express';
import { signinSupplier, signupSupplier } from '../controllers/auth_supplier.controller.js';

const router = express.Router();

router.post('/signin_supplier', signinSupplier);
router.post('/signup_supplier', signupSupplier);

export default router;
