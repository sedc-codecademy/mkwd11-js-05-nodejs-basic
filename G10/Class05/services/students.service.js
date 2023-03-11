import fs from 'fs';
import path from 'path'
import { v4 as uuidv4 } from 'uuid';

// WORKAROUND for __filename and __dirname with ES6 imports
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const studentsDbPath = path.join(__dirname, '..', 'db.json')

export const getStudentsData = () => {
    const students = fs.readFileSync(studentsDbPath, { encoding: 'utf-8' })

    return JSON.parse(students);
}

export const saveStudentsData = (students) => {
    fs.writeFileSync(studentsDbPath, JSON.stringify(students, null, 2))
}

export const addStudent = (student) => {
    const students = getStudentsData();

    students.push({
        ...student,
        id: uuidv4()
    })

    saveStudentsData(students)
}