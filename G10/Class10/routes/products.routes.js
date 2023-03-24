import express from 'express';
import tokenValidator from '../middleware/token-validator.middleware.js';

const router = express.Router()

router.use(tokenValidator)

router.get('/', (req, res) => {
    res.status(200).send([{title: 'Product 1'}])
})

export default router;