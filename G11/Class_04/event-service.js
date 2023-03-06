import { EventEmitter } from "events";
import fileService from "./file-service.js";

const emmiter = new EventEmitter();

emmiter.on("movie_added", (movieName) => {
    console.log("Movie added event...");

    const currentTime = new Date().toLocaleString();

    const logMessage = `
    Movie with name ${movieName} was added at: ${currentTime}
    _________________________________________________________
    `;

    fileService.appendToFile("./db/add_movie_logs.txt", logMessage);

});

emmiter.on("new_event", ()=> {
    console.log("This is the new event")
})

export default emmiter;