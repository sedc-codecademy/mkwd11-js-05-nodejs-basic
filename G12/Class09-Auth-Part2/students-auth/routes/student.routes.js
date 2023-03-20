import { Router } from "express";
import { StudentController } from "../controllers/student.controller.js";

export const studentRouter = Router();

// !ONLY NORMAL USERS CAN ACCESS GET
// 1. Get all students
studentRouter.get("/", StudentController.getAllStudents);
// 2. Get student by id
studentRouter.get("/:id", StudentController.getStudentById);

// !ROUTES BELOW NEED TO BE PROTECTED WITH "admin" ROLE
// 3. Create student
studentRouter.post("/", StudentController.createStudent);
// 4. Update student
studentRouter.patch("/:id", StudentController.updateStudent);
// 5. Delete all students
studentRouter.delete("/all", StudentController.deleteAllStudents);
// 6. Delete student
studentRouter.delete("/:id", StudentController.deleteStudent);
