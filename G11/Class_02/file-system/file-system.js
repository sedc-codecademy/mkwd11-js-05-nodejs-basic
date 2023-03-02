const fs = require("fs");
const path = require("path");

console.log("Syncronous FS operations");

//WRITE FILE
console.log("Before write");

// Will always overwrite the old value with the new one =)
fs.writeFileSync("my_text.txt", "Hello from node js");
fs.writeFileSync("my_text.txt", "Hello amigos =)");

const writeFile = () => {
    fs.writeFileSync("my_text.txt", "Hello amigos =)");
}
console.log("After write");

//APPEND FILE
fs.appendFileSync("my_text.txt", "\nI was appended");

//console.log('__DIRNAME:',__dirname) // return the full path of the parent folder of this file

//console.log('__FILENAME: ', __filename) // return the full path of the file itself

let pathToSave = path.join(__dirname, "my_text.txt");
console.log(pathToSave);

fs.appendFileSync(pathToSave, "\nI was saved using path to save =)");


//READ FILE
let content = fs.readFileSync(pathToSave, {encoding: "utf-8"});
console.log(content);