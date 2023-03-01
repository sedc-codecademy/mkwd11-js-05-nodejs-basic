import { writeFile, readFile } from "node:fs/promises";

export class DataService {
  // 1. Read file
  static async readJSONFile(path) {
    const data = await readFile(path, "utf-8");

    // We call json parse to convert json string into javascript object
    return JSON.parse(data);
  }

  // 2. Save file
  static async saveJSONFile(path, data) {
    return writeFile(path, JSON.stringify(data, 0, 2));
  }
}
