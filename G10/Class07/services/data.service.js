import fs from 'fs';

export const writeData = (path, data) => {
    const stringifiedData = JSON.stringify(data, null, 2);
    fs.writeFileSync(path, stringifiedData, (err) => console.log(err))
}

export const readData = (path) => JSON.parse(fs.readFileSync(path, { encoding: 'utf-8' } ))