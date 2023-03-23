import fsPromises from "fs/promises";


const writeFile = async (path, data) => {
    await fsPromises.writeFile(path, data)
};

const readFile = async (path) => {
    const content = await fsPromises.readFile(path, {encoding: "utf-8"});

    return JSON.parse(content);
};


const appendFile = async (path, data) => {
    await fsPromises.appendFile(path, data)
};



export default {
    writeFile,
    readFile,
    appendFile
}