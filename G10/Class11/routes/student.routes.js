import express from 'express';
import DataService from '../service/data.service.js';

const router = express.Router()

router.get('/', async (req, res) => {
    const students = await DataService.readFile('./data/students.json')

    res.status(200).render('student-list', { students })
})

export default router;