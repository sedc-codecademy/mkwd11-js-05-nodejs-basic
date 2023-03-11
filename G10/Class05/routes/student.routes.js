import express from 'express';
import * as studentService from '../services/students.service.js';

const router = express.Router()

// Params
// students/:id

// Query Params
// students?gender=m&sort=ASC

// {
//     gender: m,
//     sort: 'ASC'
// }

router.get('/students', (req, res) => {
    try {
        const students = studentService.getStudentsData(req.query);
        res.status(200).send(students)
    } catch (err) {
        res.status(404).send({
            message: err.message
        })
    }
})

router.post('/students', (req, res) => {
    const newStudent = req.body;
    
    try {
        studentService.addStudent(newStudent)
        res.sendStatus(200)
    } catch (err) {
        res.status(404).send({
            message: err.message
        })
    }
})

router.patch('/students/:id', (req, res) => {
    const body = req.body;
    const id = req.params.id

    try {
        studentService.updateStudent(id, body)
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.status(404).send({
            message: err.message
        })
    }
})

router.delete('/students/:id', (req, res) => {
    const id = req.params.id

    try {
        studentService.deleteStudent(id)
        res.sendStatus(200)
    } catch (err) {
        res.status(404).send({
            message: err.message
        })
    }
})

export default router;