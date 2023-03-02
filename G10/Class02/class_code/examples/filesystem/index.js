//fs module
const fs = require("fs");
const fsPromises = require("fs/promises");
//path module
const path = require("path");
const { Hehe } = require('./hehe')



console.log(new Hehe());
//node file variables
//very often used
// console.log(__dirname);
//rarely used
// console.log(__filename);

const newPath = path.join(__dirname, "data", "new.txt");

// console.log(newPath);

//[SYNC FILE OPERATIONS]

const newTxt = "This file has beeen overwritten.";

fs.writeFileSync(newPath, newTxt);

const newData = fs.readFileSync(newPath, { encoding: "utf-8" });
console.log(newData);

fs.appendFileSync(newPath, ", I am text that has been appeneded to the file.");

const peoplePath = path.join(__dirname, "people", "people.txt");

if (!fs.existsSync(path.join(__dirname, "people"))) {
  fs.mkdirSync(path.join(__dirname, "people"));
}

// fs.unlinkSync(path.join(__dirname, "people", "people.txt"));

// fs.writeFileSync(peoplePath, "Person one");

//[ASYNC FILE OPERATIONS]

// fs.readFile(newPath, { encoding: "utf-8" }, (err, data) => {
//   if (err) throw new Error("Something went wrong while reading file");
//   //   console.log(`I am from the read file async ${data}`);
// });

// fs.writeFile(
//   newPath,
//   "I have been written in the async write file",
//   { encoding: "utf-8" },
//   err => {
//     if (err) throw new Error("Something went wrong while writing file");
//     fs.readFile(newPath, { encoding: "utf-8" }, (err, data) => {
//       console.log(`Inside the callback ${data}`);
//       fs.writeFile(newPath, "I am overwritten inside the callback", err => {
//         console.log("File written");
//       });
//     });
//   }
// );

// fs.appendFile(
//   newPath,
//   ", i am text that's appeneded in the async append",
//   () => {
//     console.log("File updated");
//   }
// );

console.log("after the async write file");

//[ASYNC PROMISE OPERATIONS]

const appStart = async () => {
  await fsPromises.writeFile(newPath, "I have been overwritten with promises");
  const newData = await fsPromises.readFile(newPath, { encoding: "utf-8" });
  console.log(newData);
  await fsPromises.appendFile(
    newPath,
    ". this file has been appended by a student of G10"
  );
  const updatedData = await fsPromises.readFile(newPath, { encoding: "utf-8" });
  console.log(updatedData);
};

appStart();
