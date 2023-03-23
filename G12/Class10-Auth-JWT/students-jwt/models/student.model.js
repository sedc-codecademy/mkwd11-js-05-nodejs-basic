import { DataService } from "../services/data.service.js";
import { v4 as uuid } from "uuid";
import { pathBuilder } from "../utils/utils.js";

const studentsPath = pathBuilder(["..", "data", "students.json"]);

// Model files are in charge of CRUD operations with the database (students.json)
export class StudentModel {
  // Save students
  static async saveStudents(students) {
    await DataService.saveJSONFile(studentsPath, students);
  }

  // 1. Get all students
  static async getAllStudents() {
    const students = await DataService.readJSONFile(studentsPath);

    return students;

    // One line function
    // return DataService.readJSONFile(studentsPath);
  }
  //2. Get student by id
  static async getStudentById(studentId) {
    const students = await this.getAllStudents();

    const foundStudent = students.find(student => student.id === studentId);

    if (!foundStudent) throw new Error("Student not found");

    return foundStudent;
  }
  //   3. Create new student
  static async createStudent(studentData) {
    const students = await this.getAllStudents();

    // some checks all elements and returns a boolean that is true if for at least one of the element the expression used in the callback is true otherwise it returns false
    const emailExists = students.some(
      student => student.email === studentData.email
    );

    if (emailExists) throw new Error("Email already exists!");

    const newStudent = {
      id: uuid(),
      ...studentData,
    };

    const updatedStudents = [...students, newStudent];

    await this.saveStudents(updatedStudents);

    return newStudent;
  }
  //   4. Update student
  static async updateStudent(studentId, updateData) {
    const students = await this.getAllStudents();

    const foundStudent = await this.getStudentById(studentId);

    if (updateData.id) throw new Error("Invalid updates");

    const updatedStudent = { ...foundStudent, ...updateData };

    const updatedStudents = students.map(student =>
      student.id === updatedStudent.id ? foundStudent : student
    );

    await this.saveStudents(updatedStudents);

    return updatedStudent;
  }
  // 5. Delete all students
  static async deleteAllStudents() {
    await this.saveStudents([]);
  }
  // 6. Delete student by id
  static async deleteStudent(studentId) {
    const students = this.getAllStudents();

    const updatedStudents = students.filter(
      student => student.id !== studentId
    );

    if (updatedStudents.length === students.length)
      throw new Error("Student not found");

    await this.saveStudents(updatedStudents);
  }
}
