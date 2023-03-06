import fs from "fs";

const writeToFile = (path, data) => {
    fs.writeFileSync(path, data);
};

const readFromFile = (path) => {
    const content = JSON.parse(fs.readFileSync(path, {encoding: "utf-8"}));
    
    return content
};

const appendToFile = (path, data) => {
    fs.appendFileSync(path, data)
};


export default {
    writeToFile,
    readFromFile,
    appendToFile
}