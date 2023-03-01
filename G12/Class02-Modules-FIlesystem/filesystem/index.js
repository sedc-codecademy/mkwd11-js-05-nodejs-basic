import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  readFileSync,
  writeFileSync,
  appendFileSync,
  writeFile,
  readFile,
  appendFile,
} from "node:fs";

// Get current working directory path, copy in other projects
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Absolute path to file we want to read/update/delete
const notesPath = path.join(__dirname, "notes.txt");

// console.log(__dirname);
// console.log(notesPath);

// Sync file operations

// 1.Writing a file with sync
// Creates a file if it doesn't exist, overwrites data if it already exits
writeFileSync(notesPath, "Hello from G12!", { encoding: "utf-8" });

// 2.Reading a file with sync
const notesData = readFileSync(notesPath, { encoding: "utf-8" });

// 3.Adding data with sync
appendFileSync(
  notesPath,
  " And hello from the trainer and the students!",
  "utf-8"
);

console.log(notesData);

// Async filesystem methods
readFile(notesPath, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log("From read async", data);
  writeFile(notesPath, "From the async write function", err => {
    console.log("File written");
    appendFile(notesPath, ", and appended async!", "utf-8", err => {
      console.log("don't do this please");
    });
  });
});
