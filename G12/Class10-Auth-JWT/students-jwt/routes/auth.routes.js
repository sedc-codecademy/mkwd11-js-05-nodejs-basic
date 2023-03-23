import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";

export const authRouter = Router();

// 1. Register user
authRouter.post("/register", AuthController.registerUser);
// 2. Login user
authRouter.post("/login", AuthController.loginUser);
// 3. Refresh access token (get and post are both viable over here)
authRouter.get("/refresh-token", AuthController.refreshAccessToken);
// 4. Logout user (get and post are both viable over here)
authRouter.get("/logout", AuthController.logoutUser);
