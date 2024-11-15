import express from 'express';
import { signupAdmin } from '../controllers/auth_admin.controller.js';

const router = express.Router();

router.post('/signup_admin', signupAdmin);

export default router;
