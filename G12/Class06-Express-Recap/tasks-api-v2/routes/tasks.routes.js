import { Router } from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteAllTasks,
  deleteTask,
} from "../tasks.js";

export const tasksRouter = Router();

// 1. Get all tasks
tasksRouter.get("/", async (req, res) => {
  // try catch will catch any errors that are thrown in the functions calls inside
  try {
    // req.query contains all the key value pairs from the query params
    const filters = req.query;

    console.log(filters);

    const tasks = await getAllTasks(filters);

    return res.json(tasks);
  } catch (error) {
    console.log(error);
    // .status sets the status code of the response
    return res.status(500).send(error.message);
  }
});

// 2. Get task by id
tasksRouter.get("/:id", async (req, res) => {
  try {
    // req.params contains all dynamic path parameters
    // const taskId = req.params.id;
    const { id: taskId } = req.params;

    const foundTask = await getTaskById(taskId);

    res.json(foundTask);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// 3. Create task
tasksRouter.post("/", async (req, res) => {
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
tasksRouter.patch("/:id", async (req, res) => {
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
// 5. Delete all tasks
// Delete all is above delete task by id because we don't want that endopoint to catch the endpoint url
// /tasks/:id will always catch /tasks/all
// Homework starter , implement delete all method
tasksRouter.delete("/all", async (req, res) => {
  try {
    await deleteAllTasks();

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// 6. Delete task
tasksRouter.delete("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    await deleteTask(taskId);

    // res.status(200).send({ msg: "Deletion success!" });
    // 204 means that operation was successful but there is not data to send back
    res.sendStatus(204);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});
