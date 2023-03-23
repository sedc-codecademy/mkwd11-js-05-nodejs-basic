import express from 'express'
import { fruitsSession } from '../sessions/sessions.const.js'

const router = express.Router();

const fruits = [
    { name: 'Strawberry', price: 10 },
    { name: 'Banana', price: 15 }
]

router.get('/', fruitsSession, (req, res) => {
    console.log(req.session)
    res.status(200).send(fruits)
})

export default router;