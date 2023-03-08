import express, { response } from "express";
import fs from "fs";

const router = express.Router();


//Creating routes
//This route will be hit with GET method
router.get("/", (request, response) => { // localhost:3000 => default route
    //console.log(request);
    //request => we access the call made to this route
    //response => we use it to return result to the user that requested this route =)
    response.send("<h1>Default route / using express =)</h1>")
});

//localhost:3000/about
router.get("/about", (request, response) => {
    response.setHeader("Content-Type", 'text/html');
    response.send("<h1>About route /about using express</h1>");
})

//Exerice #1: Create get route /student_info;
//in h1 elemet return tot he user your fullname; age and subject that you study
router.get("/student_info", (request, response) => {
    response.send("<h1>Fullname: Gjorge Dimitrov; 28; NodeJs</h1>")
})

//We can return JSON; request; response
router.get("/students", (req, res) => {
    const students = [
        {id: 1, name: "Lebron", age: 28, gender: "male"},
        {id: 2, name: "Lesa Lesly", age: 27, gender: "female"}
    ];

    // res.setHeader("Content-Type", 'application/json');
    res.send(JSON.stringify(students))
});

router.post("/student", (request, response) => {
    console.log("Student POST route")
    //requst.body => the values sent with the POST requst
    const body = request.body;
    console.log(body);

    console.log("Name of student is: ", body.name)

    let student = {
        name: body.name,
        age: body.age
    }

    const students = JSON.parse(fs.readFileSync("./students.json", {encoding: "utf-8"}));
    students.push(student)

    fs.writeFileSync("./students.json", JSON.stringify(students, null, 2));

    //We can use it in order to write in json file =)
    response.status(201).send({message: "Student has been created in DB."});
});

//PATH PARAMS localhost:3000/student/2 => Return student that has ID 2
router.get("/student/:id", (request, response) => {
    const students = [
        { id: 1, name: "John Doe", age: 28, gender: "male" },
        { id: 2, name: "Lee Mary", age: 29, gender: "female" },
    ];

    const pathParams = request.params;
    console.log(pathParams)
    
    const studentFound = students.find((student) => student.id === Number(pathParams.id));

    if(studentFound){
        response.send(JSON.stringify(studentFound))
    }else {
        response.status(404).send({message: "Student not found."})
    }
});

//QUERY PARAMS /?ime=vrednost

//    key=value pair
// /?order=ascending
// chained query params
// /?order=ascending&sort=byDate
router.get("/students_byoder", (request, response) => {
    const queryParams = request.query;

    console.log(queryParams);

    response.send("Query Params Route")
})



// * is WILDCARD MEANS ALL REST
// Every non-existing route
// will hit here =)
router.get("*", (req, res) => {
    // res.status(404)
    // res.send("<h1>HTTP: 404 NOT FOUND AMIGO</h1>")

    //same as above in one line
    // res.status(404).send("<h1>HTTP: 404 NOT FOUND AMIGO</h1>")

    // res.status(404).send({err_message: "PAGE NOT FOUND"});

    res.redirect("/");
 
})

export default router;