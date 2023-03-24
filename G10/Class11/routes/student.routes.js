import express from 'express';
import DataService from '../service/data.service.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router()

router.get('/', async (req, res) => {
    const students = await DataService.readFile('./data/students.json')

    res.status(200).render('student-list', { students })
})

router.get('/add-student', (req, res) => {
    res.status(200).render('add-student-form')
})

router.post('/add-student', async (req, res) => {
    const studentData = req.body;
    
    console.log(studentData)

    const students = await DataService.readFile('./data/students.json');

    const student = {
        ...studentData,
        id: uuidv4()
    }

    students.push(student)

    await DataService.writeFile('./data/students.json', students);

    res.redirect('/students')
})

router.get('/:id', async (req, res) => {
    const students = await DataService.readFile('./data/students.json');

    const student = students.find(s => s.id === req.params.id);

    if (student) {
        res.status(200).render('student-details', { student })
    } else {
        res.status(404).render('not-found')
    }
})

export default router;