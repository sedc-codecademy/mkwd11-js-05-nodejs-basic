const { writeToFile, readFile, appendToObject, removeFile, appStart } = require('./src/helpers');
const path = require('path');
const { appendFile } = require('fs');

const filename = path.join(__dirname, 'people.json')

const someObject = {
    name: 'Arnold',
}
writeToFile(filename, someObject);

const fileFromStorage = readFile(filename)
console.log(fileFromStorage);
appendToObject(filename, 'Strafcige2r');
removeFile(filename);


appStart()


