import { EventEmitter } from "node:events";

// Creating an emitter
const emitter = new EventEmitter();

// Registering an event listener
emitter.on("event", () => {
  console.log("event fired");
});

// Emitting or firing a named event
// emitter.emit("event");

// We can emit an event multiple times
// emitter.emit("event");
// emitter.emit("event");
// emitter.emit("event");

// Emitting an event with custom data
emitter.on("data", data => {
  console.log("data event fired");
  console.log(data);
});

// emitter.emit("data", "Hello from G12!");

// Emitting an event with multiple arguments
emitter.on("full-name", (firstName, lastName) => {
  console.log("full-name event fired");
  console.log(`${firstName} ${lastName}`);
});

// emitter.emit("full-name", "Borche", "Borisovski");

// this behavior in event emitters
emitter.on("function", function () {
  console.log("From function event");
  console.log(this);
});

emitter.on("arrow", () => {
  console.log("From arrow event");
  console.log(this);
});

// emitter.emit("function");
// emitter.emit("arrow");

// Multiple event listeners for same event (executed sync on event emit)
emitter
  .on("message", () => {
    console.log("first message listener");
  })
  .on("message", () => {
    console.log("second message listener");
  })
  .on("message", () => {
    console.log("third message listener");
  });

// emitter.emit("message");

// Emitting only once using the .once listener
emitter.once("once", () => {
  console.log("Once event fired");
});

emitter.emit("once");
emitter.emit("once");
emitter.emit("once");
