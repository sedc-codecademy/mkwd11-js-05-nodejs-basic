const fileService = require("./file-service");
const path = require("path");


// WRITE TO FILE
fileService.write("myFile.txt", "This file was created during writing");


fileService.write("../db/my_db.txt", "Saving to text db");

/**
 * __dirname => ke ja vrati celata pateka, do samiot folder
 * kade shto se naogja index.js file-ot
 */
const pathToDb = path.join(__dirname, "../", "db", "second_db.txt");

console.log(pathToDb);

console.log("SYNC FIRST:")
fileService.write(pathToDb, "New data written, using the path module as well");
console.log("SYNC SECOND:")

fileService.write(pathToDb, "I overwrite the previous content.");



// APPEND TO FILE
fileService.append("appendFile.txt", "I was appended.");
fileService.append(pathToDb, "\nI was appended.");


// READ FROM FILE

const contentFromDB = fileService.read(pathToDb);
console.log(contentFromDB);

// WRITE FILE ASYNC
console.log("**** WRITE FILE ASYNC ****");

console.log("FIRST")
fileService.writeFile("my_text_async.txt", "I was written with async fs method")
console.log("SECOND")
