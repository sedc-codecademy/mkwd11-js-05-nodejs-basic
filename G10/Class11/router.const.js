import express from 'express';
import studentsRouter from './routes/student.routes.js'

const router = express.Router();

router.use('/students', studentsRouter)

export default router;