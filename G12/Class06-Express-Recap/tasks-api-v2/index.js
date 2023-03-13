import express from "express";
import { tasksRouter } from "./routes/tasks.routes.js";

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

// Creating a server by calling the express function
const app = express();

app.use(express.json());

app.use("/tasks", tasksRouter);

app.listen(PORT, HOST, () => {
  console.log(`Server is up at ${PORT}`);
});
