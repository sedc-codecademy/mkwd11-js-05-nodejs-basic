import path from "node:path";
import { fileURLToPath } from "node:url";
import { DataService } from "./data.service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tasksPath = path.join(__dirname, "tasks.json");

const task = {
  text: "Teach code",
  isFinished: false,
  author: "Borche",
};

const app = async () => {
  DataService.saveJSONFile(tasksPath, [task]);
};

app();
