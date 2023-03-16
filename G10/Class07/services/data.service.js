import fs from 'fs';

export const writeData = (path, data) => {
    fs.writeFileSync(path, data, (err) => console.log(err))
}

export const readData = (path) => fs.readFileSync(path, { encoding: 'utf-8' } )