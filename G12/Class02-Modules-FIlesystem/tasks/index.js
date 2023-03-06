// We can rename imports with our desired names using as
import { v4 as uuid } from "uuid";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DataService } from "./data.service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const tasksPath = path.join(__dirname, "tasks.json");

// 1. Get all tasks
const getAllTasks = async () => {
  try {
    const tasks = await DataService.readJSONFile(tasksPath);

    // if (tasks.length < 1) throw new Error("No tasks found");

    return tasks;
  } catch (error) {
    console.log("Something went wrong");
    console.log(error);
  }
};

// 2. Save tasks
const saveTasks = async tasks => {
  await DataService.saveJSONFile(tasksPath, tasks);
};

// 3. Create task
const createTask = async text => {
  try {
    // Read tasks
    const tasks = await getAllTasks();

    const newTask = {
      id: uuid(),
      text,
      isFinished: false,
    };

    // Add task
    tasks.push(newTask);

    // Saving new tasks array in json
    await saveTasks(tasks);
  } catch (error) {
    console.log(error);
  }
};

// 4. Update task
const updateTask = async taskid => {
  try {
    // Get tasks
    const tasks = await getAllTasks();
    // Search for task
    const foundTask = tasks.find(task => task.id === taskid);

    console.log("Found task", foundTask);

    // This will terminate function and error will go to catch block
    if (!foundTask) throw new Error("Task not found");

    // Update task object
    foundTask.isFinished = true;

    // Finally save tasks in .json file
    await saveTasks(tasks);
  } catch (error) {
    console.log(error);
  }
};

// 5. Delete task
const deleteTask = async taskId => {
  // Read all tasks
  const tasks = await getAllTasks();

  const updatedTasks = tasks.filter(task => task.id !== taskId);

  console.log("Original tasks length ", tasks.length);
  console.log("Updated tasks legnth ", updatedTasks.length);

  if (updatedTasks.length === tasks.length) throw new Error("Task not found");

  await saveTasks(updatedTasks);
};

const app = async () => {
  // await createTask("First task");
  // await createTask("Second task");
  // await createTask("Third task");
  // await updateTask("04b936b5-0c05-4d5e-b8fd-eea30a1e861c");
  await deleteTask("d6013a74-f671-4bdf-b1be-e27479a2795f");
  const tasks = await getAllTasks();
  console.log(tasks);
};

app();
