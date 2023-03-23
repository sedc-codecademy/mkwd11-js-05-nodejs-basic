import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs'
import fs from 'fs';
import { createAccessToken } from '../jwt.const.js';

const router = express.Router()

router.post('/register', (req, res) => {
    const userData = req.body;

    console.log(userData)

    const hashedPassword = bcrypt.hashSync(userData.password, 10)

    const user = {
        id: uuidv4(),
        username: userData.username,
        password: hashedPassword
    }

    fs.writeFileSync('./data/users.json', JSON.stringify([user]))

    console.log(user)

    res.status(200).send(user)
})

router.post('/login', (req, res) => {
    const userData = req.body;

    const users = JSON.parse(fs.readFileSync('./data/users.json'));

    const user = users.find(user => user.username === userData.username)

    if (!user) {
        res.status(404).send('User not found');
    }

    const isSamePassword = bcrypt.compareSync(userData.password, user.password)

    if (isSamePassword) {
        res.status(200).send('You are logged in')
    } else {
        res.status(400).send('Invalid credentials')
    }

    const token = createAccessToken(user.id)

    console.log(token)

    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZTMyMmNiOC0xY2UzLTRmYmItYjg5NC1kOTZlNTY4YWUzZDciLCJpYXQiOjE2Nzk0MjgwNTgsImV4cCI6MTY3OTQyODY1OH0.LHB9z4_aJvWZLmduk-Qtro3pFQPFZixQ-EznLC-2r44

    res.sendStatus(200)
})

export default router;