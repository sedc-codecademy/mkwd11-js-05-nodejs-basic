import { Router } from "express";
import { sessionValidator } from "../middlewares/session-validator.middleware.js";
import { authRouter } from "../routes/auth.routes.js";
import { studentRouter } from "../routes/student.routes.js";

export const globalRouter = Router();

globalRouter.use("/", authRouter);
// Adding sessionValidator to protect all routes related to students
globalRouter.use("/students", sessionValidator, studentRouter);
