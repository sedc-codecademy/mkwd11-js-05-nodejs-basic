import {EventEmitter} from "events"; // ES6 module import syntax
import colors from "colors";
// const {EventEmitter} = require("events") // CommonJS module synstax

const eventEmitter = new EventEmitter();

// #1. Basic event;

//EVENT LISTENER
eventEmitter.on("go", () => {
    console.log("GO !");
});

//EVENT TRIGGERER
eventEmitter.emit("go");

eventEmitter.emit("run"); // Nema da bide trigeriran, bidejki nemame takov event listener.


console.log("Ready!");
console.log("Set!");
eventEmitter.emit("go");

//EVENT LISTENER
eventEmitter.on("my_event", () => {
    //The CB function will be triggered
    //whenever this event is emmited =)
    console.log("This is the event called: my_event".green)
});


//EVENT TRIGGERER
eventEmitter.emit("my_event");

// #2. Order of events

//EVENT TRIGGERER
eventEmitter.emit("event"); // The order really matters =)

//EVENT LISTENER
eventEmitter.on("event", () => {
    console.log("Event called")
});

//EVENT TRIGGERER
eventEmitter.emit("event"); // Triggers the event =)

// #3. Events can have parameters

//EVENT LISTENER
eventEmitter.on("userLogin", (user) => {
    console.log(`${user} has logged in.`.bgGreen)
});

//EVENT TRIGGERER
eventEmitter.emit("userLogin", "John Doe");

// #4. Events can have multiple paramaters

//EVENT LISTENER
eventEmitter.on("forecast", (celcius, time, location) => {
    let recordForecast = `In ${location} the temp is: ${celcius}, measuared at: ${time}.`

    console.log(recordForecast);
});

eventEmitter.emit("forecast", 11, "12:36", "Gevgelija");


// #5. Events can be chained;

//EVENT LISTENER
//Prilepuvame poveke eventi na samiot event emmiter odednas
eventEmitter
.on("first", () => console.log("First was emmited."))
.on("second", () => console.log("Second was emmited."))
.on("third", () => console.log("Third was emmited."))


//EVENT TRIGGERER
eventEmitter.emit("third");
eventEmitter.emit("first");
eventEmitter.emit("second");
eventEmitter.emit("first");

// #6. Same name events
console.log("**** ****")
eventEmitter
.on("recording", (one) => {
    console.log(one)
    console.log("First recoding")
    console.log(1)
    console.log(2)
    console.log(3)
})
.on("recording", (two, ...rest) => {
    console.log(two)
    console.log(rest)
    if(rest.includes("Two")){
        console.log("I got an argument")
    }
    console.log("Second recoding")
})
.on("recording", (three) => {
    console.log(three)
    console.log("Third recoding")
})
.prependOnceListener("recording", () => {
    console.log("I am prepend listener")
})
//PrependOnceListener ke se izvrshi prv vo nizata na eventi =)
eventEmitter.emit("recording", "One", "Two")


// #7. Nested event
console.log("**** ****")

eventEmitter.on("inside", () => {
    console.log("From inside")
})

eventEmitter.on("outside", () => {
   eventEmitter.emit("inside");
})

eventEmitter.emit('outside');