import { Router } from "express"
import authRouter from "../routes/auth.router.js";
import productsRouter from "../routes/products.router.js";
import { authenticateToken } from "../middlewares/token_validator.js";

const router = Router();

router.use(authRouter);
router.use("/products", authenticateToken, productsRouter);

export default router