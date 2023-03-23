import express from 'express';
import AuthController from '../controllers/auth.controller.js';

const authController = new AuthController()

const router = express.Router()

router.post('/register', authController.registerUser)
router.post('/login', authController.loginUser)

export default router;