import express from 'express';
import AuthController from '../controllers/auth.controller.js';
import userValidator from '../middleware/user-validator.middleware.js'

const authController = new AuthController()

const router = express.Router()

router.post('/register', userValidator, authController.registerUser)
router.post('/login', authController.loginUser)
router.post('/refresh-token', authController.refreshToken)

export default router;