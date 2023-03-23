import path from "node:path";
import { fileURLToPath } from "node:url";

export const pathBuilder = fragments => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  return path.join(__dirname, ...fragments);
};
