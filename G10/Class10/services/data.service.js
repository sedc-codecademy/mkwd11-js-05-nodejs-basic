import fs from 'fs/promises';

class DataService {
    static async readFile(path) {
        const data = await fs.readFile(path, { encoding: 'utf-8' })
        return JSON.parse(data)
    }

    static async saveFile(path, data) {
        return await fs.writeFile(path, JSON.stringify(data, null, 2))
    }
}