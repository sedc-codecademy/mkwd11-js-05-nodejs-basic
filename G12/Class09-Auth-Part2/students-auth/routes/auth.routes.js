import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";

export const authRouter = Router();

// 1. Register user
authRouter.post("/register", AuthController.registerUser);
// 2. Login user
authRouter.post("/login", AuthController.loginUser);
// 3. Logout user (can be done with post or get)
authRouter.get("/logout", AuthController.logoutUser);
