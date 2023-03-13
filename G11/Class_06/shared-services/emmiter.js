import EventEmmiter from "events";

const emmiter = new EventEmmiter();

const greetPerson = () => {
    console.log("Hello Person")
}

emmiter.on("start", () => {
    console.log("Start event.");
    greetPerson()
});

emmiter.emit("start");

//If we emit event that does not exist, nothing will happen =)
emmiter.emit("other_event"); 