import express from "express";
import router from "./routes.js";

const app = express();

//Middleware
// Simple middleware
app.use((req, res, next) => {

    console.log("We are at middleware, We intercept each request made to the server =)");
    //without next() the request is stuck;

    // after the middleware finish it's job
    // we invoke the method next() that will let the app reach the next/following logic
    next(); 
})

//Exercise #2: Create middleware to show time of the request
const timeOfRequest = (req, res, next) => {
    let time = new Date().toLocaleString();

    console.log(`Request made to server at: ${time}`)

    next();
}

app.use(timeOfRequest);

app.use(express.json());

app.use(router); // In this middleware we use the Router that has all the predefined routes =)


app.listen(3000, () => {
    console.log("Server is up and running...");
});


