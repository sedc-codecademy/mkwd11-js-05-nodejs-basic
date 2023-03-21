import express from 'express'
import authRouter from './routes/auth.routes.js'
import productsRouter from './routes/products.routes.js'
import fruitsRouter from './routes/fruits.routes.js'
const router = express.Router();

router.use('/auth', authRouter)
router.use('/products', productsRouter)
router.use('/fruits', fruitsRouter)

export default router;