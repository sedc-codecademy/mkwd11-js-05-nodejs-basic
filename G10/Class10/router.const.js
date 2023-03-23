import express from 'express';
import authRouter from './routes/auth.routes.js'
import productsRouter from './routes/products.routes.js'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/products', productsRouter)

export default router;