import fs from 'fs';
import path, { parse } from 'path'
import { v4 as uuidv4 } from 'uuid';

// WORKAROUND for __filename and __dirname with ES6 imports
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const studentsDbPath = path.join(__dirname, '..', 'db.json')

export const getStudentsData = (query) => {
    let students = JSON.parse(fs.readFileSync(studentsDbPath, { encoding: 'utf-8' }))

    if (students?.length <= 0) {
        throw new Error('There are no students')
    }

    if (query?.gender) {
        students = students.filter(s => s.gender === query.gender)
    }

    if (query?.country) {
        students = students.filter(s => s.country === query.country)
    }

    return students;
}

export const getStudentById = (id) => {
    const students = getStudentsData();

    const student = students.find(s => s.id === id);

    if (!student) {
        throw new Error(`Student with id: ${id} not found`)
    }

    return student;
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

export const updateStudent = (id, student) => {
    const students = getStudentsData();

    const index = students.findIndex(s => s.id === id);

    if (index < 0) {
        throw new Error(`Student with id:${id} not found`)
    }

    students[index] = {
        ...students[index],
        ...student
    }
    saveStudentsData(students)
}

export const deleteStudent = (id) => {
    const students = getStudentsData();

    const filteredStudents = students.filter(s => s.id !== id);

    saveStudentsData(filteredStudents);
}