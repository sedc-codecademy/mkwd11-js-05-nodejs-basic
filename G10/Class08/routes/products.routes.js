import express from 'express'
import { productsSession } from '../sessions/sessions.const.js';
import sessionValidator from '../sessions/session.validator.js';

const router = express.Router();

const products = [
    { name: 'Orange', price: 40 },
    { name: 'Apple', price: 50 }
]

router.get('/', productsSession, sessionValidator, (req, res) => {
    res.status(200).send(products)
})

router.get('/:name', productsSession, sessionValidator, (req, res) => {
    const productWithMatchingName = products.find(p => p.name === req.params.name)

    res.status(200).send(productWithMatchingName)
})

export default router;