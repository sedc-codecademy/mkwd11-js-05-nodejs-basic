import { EventEmitter } from "events";

const second_emmiter = new EventEmitter()

second_emmiter.on("second_event", () => {
    console.log("Hello from second event emmiter")
})

export default second_emmiter;