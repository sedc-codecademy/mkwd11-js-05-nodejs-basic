import { EventEmitter } from "node:events";

export const emitter = new EventEmitter();

emitter.on("event", msg => {
  console.log(msg);
  console.log("=".repeat(50));
  console.log("Logged from the main file");
});
