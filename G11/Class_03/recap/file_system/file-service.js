const fs = require("fs");

// SYNCRONOUS FS OPERATIONS
const writeToFile = (path, data) => {
    fs.writeFileSync(path, data);
};

const appendToFile = (path, data) => {
    fs.appendFileSync(path, data)
};


const readFromFile = (path) => {
    const content = fs.readFileSync(path, {encoding: "utf-8"});

    return content
};

// ASYNC FS OPERATIONS

const writeFile = (path, data) => {
    fs.writeFile(path, data, (error) => {
        if(error){
            console.log("Error happened", error
            )
        }
        console.log("THIRD: Data was written")
    })
}

const appendFile = (path, data) => {
    fs.appendFile(path, data, (error) => {
        if(error) {
            // console.log(error)
            throw new Error(error)
        }
        console.log("File was appened successfully.")
    })
}

module.exports = {
    write: writeToFile,
    append: appendToFile,
    read: readFromFile,
    writeFile: writeFile,
    appendFile: appendFile
}

// module.exports = {
//    writeToFile,
// appendToFile,
//    readFromFile
// };

