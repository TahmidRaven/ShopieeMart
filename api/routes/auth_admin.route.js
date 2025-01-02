import express from 'express';
import { signupAdmin, signinAdmin } from '../controllers/auth_admin.controller.js';

const router = express.Router();

router.post('/signup_admin', signupAdmin);
router.post('/signin_admin', signinAdmin);

export default router;
