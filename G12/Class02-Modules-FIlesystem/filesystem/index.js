import path from "node:path";
import { fileURLToPath } from "node:url";

// Get current working directory path, copy in other projects
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Absolute path to file we want to read/update/delete
const notesPath = path.join(__dirname, "notes.txt");

console.log(__dirname);
console.log(notesPath);
