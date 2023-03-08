import express from "express";


const app = express();

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

app.listen(3000, () => {
    console.log("Server is up and running...");
});


