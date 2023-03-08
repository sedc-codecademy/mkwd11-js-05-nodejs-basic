import path from "node:path";
import { v4 as uuid } from "uuid";
import { fileURLToPath } from "node:url";
import { DataService } from "./services/data.service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const tasksPath = path.join(__dirname, "data", "tasks.json");

const saveTasks = async tasks => {
  await DataService.saveJSONFile(tasksPath, tasks);
};
// 1. Get all tasks
export const getAllTasks = async () => {
  const tasks = await DataService.readJSONFile(tasksPath);

  return tasks;
};
// 2. Get task by id
export const getTaskById = async taskId => {
  const tasks = await getAllTasks();

  const foundTask = tasks.find(task => task.id === taskId);

  if (!foundTask) throw new Error("Task not found");

  return foundTask;
};
// 3. Create task
export const createTask = async (text, author) => {
  const tasks = await getAllTasks();

  const task = {
    id: uuid(),
    text,
    author,
    isFinished: false,
  };

  const updatedTasks = [...tasks, task];

  await saveTasks(updatedTasks);

  return task;
};
// 4. Update task
export const updateTask = async (taskId, updateData) => {
  const tasks = await getAllTasks();
  const foundTask = await getTaskById(taskId);

  //   Using spread operator to overwrite the found task properties with the update data properties
  const updatedTask = {
    ...foundTask,
    ...updateData,
  };

  //   We create a new updated array in which we replace the old task with the updated task in it's old place by using id matching
  const updatedTasks = tasks.map(task => {
    if (task.id === updatedTask.id) return updatedTask;
    return task;
  });
  //   Using ternary operator
  //   const updatedTasks = tasks.map(task =>
  //     task.id === updatedTask.id ? updatedTask : task
  //   );

  await saveTasks(updatedTasks);

  return updatedTask;
};
// 5. Delete task
export const deleteTask = async taskId => {
  // Read all tasks
  const tasks = await getAllTasks();

  const updatedTasks = tasks.filter(task => task.id !== taskId);

  if (updatedTasks.length === tasks.length) throw new Error("Task not found");

  await saveTasks(updatedTasks);
};

// 6. Delete all tasks
