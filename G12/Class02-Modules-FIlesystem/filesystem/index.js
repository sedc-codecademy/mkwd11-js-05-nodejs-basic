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

import fsPromise from "node:fs/promises";

// Get current working directory path, copy in other projects
// Config line remains the same
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Absolute path to file we want to create/read/update
const notesPath = path.join(__dirname, "notes.txt");

// console.log(__dirname);
// console.log(notesPath);

// File operations
// 1. Write file methods create a file if it doesnt exist and overwrite data if it does
// 2. Read file methods read a file from the system and return the data
// 3. Append file methods add data to the end of the file without overwriting the existing one

// Sync file operations

// 1.Writing a file with sync
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
// This can easily lead to callback hell if nested too much

// 1. Read file
// readFile(notesPath, "utf-8", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log("From read async", data);
//   //   2. Overwrite file
//   writeFile(notesPath, "From the async write function", err => {
//     console.log("File written");
//     // 3. Update file
//     appendFile(notesPath, ", and appended async!", "utf-8", err => {
//       console.log("Update success");
//     });
//   });
// });

// Promise methods
const handleNotes = async () => {
  try {
    // 1. Read file
    const notesData = await fsPromise.readFile(notesPath, "utf-8");
    console.log("first read", notesData);
    //   2. Write file
    await fsPromise.writeFile(notesPath, "From the promises function", "utf-8");
    // 3. Update file
    await fsPromise.appendFile(
      notesPath,
      " , and i've been updated from promise function",
      "utf-8"
    );
    // 4. Read file
    const finalNotesData = await fsPromise.readFile(notesPath, "utf-8");

    console.log("final read", finalNotesData);
  } catch (error) {
    console.error("Something went terribly wrong", error);
  }
};

handleNotes();
