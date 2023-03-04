import { writeFile, readFile } from "node:fs/promises";

export class DataService {
  // 1. Read file
  static async readJSONFile(path) {
    const stringData = await readFile(path, "utf-8");

    // We call json parse to convert json string into javascript object
    return JSON.parse(stringData);
  }

  // 2. Save file
  static async saveJSONFile(path, data) {
    // We call json stringify to convert javascript object into valid json string
    return writeFile(path, JSON.stringify(data, 0, 2));
  }
}
