import express from "express";


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


//Creating routes
//This route will be hit with GET method
app.get("/", (request, response) => { // localhost:3000 => default route
    //console.log(request);
    //request => we access the call made to this route
    //response => we use it to return result to the user that requested this route =)
    response.send("<h1>Default route / using express =)</h1>")
});

//localhost:3000/about
app.get("/about", (request, response) => {
    response.setHeader("Content-Type", 'text/html');
    response.send("<h1>About route /about using express</h1>");
})

//Exerice #1: Create get route /student_info;
//in h1 elemet return tot he user your fullname; age and subject that you study
app.get("/student_info", (request, response) => {
    response.send("<h1>Fullname: Gjorge Dimitrov; 28; NodeJs</h1>")
})

//We can return JSON; request; response
app.get("/students", (req, res) => {
    const students = [
        {id: 1, name: "Lebron", age: 28, gender: "male"},
        {id: 2, name: "Lesa Lesly", age: 27, gender: "female"}
    ];

    // res.setHeader("Content-Type", 'application/json');
    res.send(JSON.stringify(students))
})

// * is WILDCARD MEANS ALL REST
// Every non-existing route
// will hit here =)
app.get("*", (req, res) => {
    // res.status(404)
    // res.send("<h1>HTTP: 404 NOT FOUND AMIGO</h1>")

    //same as above in one line
    // res.status(404).send("<h1>HTTP: 404 NOT FOUND AMIGO</h1>")

    // res.status(404).send({err_message: "PAGE NOT FOUND"});

    res.redirect("/");
 
})


app.listen(3000, () => {
    console.log("Server is up and running...");
});


