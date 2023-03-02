const fs = require('fs');
const fsPromises = require('fs/promises');


function writeToFile(filename, data) {
    if (!fs.existsSync(filename)) {
        console.log('NEW FILE CREATED', filename);
    }
    else {
        console.log('DATA OVERWRITTEN SUCCESSFULY TO FILE', filename);
    }
    let isObject = true;
    if (data instanceof Array) {
        data.forEach(element => {
            if (!(element instanceof Object))
                isObject = false;
        })
    }
    if (!isObject) return;
    if (typeof data != 'object') return;
    fs.writeFileSync(filename, JSON.stringify(data));
}

function readFile(filename) {
    if (!fs.existsSync(filename)) {
        console.log(`File ${filename} not found`);
        return;
    }
    const fileData = fs.readFileSync(filename, { encoding: 'utf-8' });
    return JSON.parse(fileData);
}

function appendToObject(filename, data) {
    const objectToAppendTo = readFile(filename);
    if (!objectToAppendTo) return;
    if (data == undefined || data == null) return;
    const objectWithAppendedData = {
        ...objectToAppendTo,
        data,
    }
    writeToFile(filename, objectWithAppendedData);
}

function removeFile(filename) {
    if (fs.existsSync(filename)) {
        fs.unlinkSync(filename)
    }
}

async function appStart() {
    await fsPromises.writeFile('./newFileAsync.txt', 'hello from async fie promises');
    const data = await fsPromises.readFile('./newFileAsync.txt', { encoding: 'utf-8' });
    console.log(data);
}

module.exports = { writeToFile, readFile, appendToObject, removeFile, appStart };

