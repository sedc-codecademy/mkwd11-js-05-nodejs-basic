import fs from 'fs/promises'

export default class DataService {
    static async readFile(path) {
        const data = await fs.readFile(path, { encoding: 'utf-8' });
        return JSON.parse(data)
    }

    static async writeFile(path, data) {
        return await fs.writeFile(path, JSON.stringify(data, null, 2))
    }
}