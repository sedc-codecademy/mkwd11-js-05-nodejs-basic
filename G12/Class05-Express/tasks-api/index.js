import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "./tasks.js";

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

const app = express();

app.use(express.json());

// 1. Get all tasks
app.get("/tasks", async (req, res) => {
  // try catch will catch any errors that are thrown in the functions calls inside
  try {
    const tasks = await getAllTasks();

    return res.json(tasks);
  } catch (error) {
    console.log(error);
    // .status sets the status code of the response
    return res.status(500).send(error.message);
  }
});
// 2. Get task by id
app.get("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    const foundTask = await getTaskById(taskId);

    res.json(foundTask);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
// 3. Create task
app.post("/tasks", async (req, res) => {
  try {
    const { text, author } = req.body;

    if (!text || !author) throw new Error("Invalid task data");

    const newTask = await createTask(text, author);
    // 201 is status that means something was created
    return res.status(201).json(newTask);
  } catch (error) {
    console.log(error);
    // 400 is bad request
    return res.status(400).send(error.message);
  }
});
// 4. Update task
app.patch("/tasks/:id", async (req, res) => {
  try {
    const updateData = req.body;
    const taskId = req.params.id;

    // We don't allow ids to be updated cause it breaks the database
    if (updateData.id) throw new Error("Invalid Update");

    const updatedTask = await updateTask(taskId, updateData);

    return res.status(200).send(updatedTask);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});
// 5. Delete task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    await deleteTask(taskId);

    res.status(200).send({ msg: "Deletion success!" });
  } catch (error) {
    return res.status(404).send(error.message);
  }
});
// 6. Delete all tasks
// Homework starter , implement delete all method

app.listen(PORT, HOST, () => {
  console.log(`Server is up at ${PORT}`);
});
