import { Router } from "express";
import { studentRouter } from "../routes/student.routes.js";

export const globalRouter = Router();

globalRouter.use("/students", studentRouter);
