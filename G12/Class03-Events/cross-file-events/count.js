import { emitter } from "./main.js";

export const countEmitter = emitter;

let count = 0;

countEmitter.on("count", () => {
  count++;
  console.log("Current count value", count);
});
