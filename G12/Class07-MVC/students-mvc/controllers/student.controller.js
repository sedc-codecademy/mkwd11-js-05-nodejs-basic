import { StudentModel } from "../models/student.model.js";

// Controllers are in charge of handling the request listner functions
export class StudentController {
  // 1. Get all students
  static async getAllStudents(req, res) {
    try {
      const students = await StudentModel.getAllStudents();

      return res.json(students);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  }
  //   2. Get student by id
  static async getStudentById(req, res) {
    try {
      const { id: studentId } = req.params;

      const foundStudent = await StudentModel.getStudentById(studentId);

      return res.json(foundStudent);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ msg: error.message });
    }
  }
  //   3. Create new student
  static async createStudent(req, res) {
    try {
      const studentData = req.body;

      const newStudent = await StudentModel.createStudent(studentData);

      return res.status(201).json(newStudent);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: error.message });
    }
  }
  //   4. Update student
  static async updateStudent(req, res) {
    try {
      const { id: studentId } = req.params;
      const updateData = req.body;

      const updatedStudent = await StudentModel.updateStudent(
        studentId,
        updateData
      );

      return res.json(updatedStudent);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: error.message });
    }
  }
}
