import fs from "fs";
import fsPromises from "fs/promises";

// *** Synchronous way

// const writeFile = (path, data) => {
//     fs.writeFileSync(path, data); // will always overwrite prev. values in the file
// };

// const readFile = (path) => {
//   const content = fs.readFileSync(path, {encoding: "utf-8"});

//   return content
// };

// const appendFile = (path, data) => {
//     fs.appendFileSync(path, data)
// };

// writeFile("songs.txt", "By The Way - RHCP");
// writeFile("dummy_script.js", "console.log('Hello World')");
// writeFile("songs.txt", "Unkown - RHCP");

// appendFile("songs.txt", "\nFlowers - M.C."); //will append new value to the already existing one

// console.log(readFile("songs.txt"));

// *** Asynchronous way

// WAY 1 CALLBACK SYNTAX;
// const writeFile = (path, data) => {
//     fs.writeFile(path, data, (err) => {
//         if(err){
//             console.log("Error Happened")
//         }

//         console.log("File Was saved")
//     });
// };

// writeFile("songs.txt", "Three little birds - Bob Marley");

// WAY 2 ASYNC/AWAIT SYNTAX;

const writeFile = async (path, data) => {
    await fsPromises.writeFile(path, data)
};

const readFile = async (path) => {
    const content = await fsPromises.readFile(path, {encoding: "utf-8"});

    return content
};


const appendFile = async (path, data) => {
    await fsPromises.appendFile(path, data)
};


// await writeFile("songs.txt", "Some song - Unknown Artist");
// await appendFile("songs.txt", "\nBob Bobski Song - Unkown");
// const songs = await readFile("songs.txt");

// console.log(songs);

// export default {
//     writeFile: writeFile,
//     readFile: readFile,
//     appendFile: appendFile
// };

//Same as above, but shorter 
export default {
    writeFile,
    readFile,
    appendFile
}