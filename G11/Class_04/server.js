import http from "http";
import fileService from "./file-service.js";
import { addMovie } from "./app.js";

const server = http.createServer((request, response) => {
    // console.log(request);


    //very basic response;
    // response.setHeader("Content-Type", "text/html");
    // response.write("<h1>Hello fellas, we return html from our server =)</h1>");
    // response.end();

    const url = request.url;
    const method = request.method;
    

    if(url === "/"){
        response.setHeader("Content-Type", "text/html");
        response.write("<h1>Hello fellas, we return html from our server =)</h1>");
        response.end();
    };

    if(url === '/contact'){
        response.setHeader("Content-Type", "text/html");
        response.write("<h1>We hit contact endpoint</h1>");
        response.end();
    };

    if(url === "/something"){
        response.setHeader("Content-Type", "text/html");
        response.write("<p>This is something endpoint</p>");
        response.end();
    };

    /**
     * fetch("localhost:3000/movies") => will return us JSON FILE
     * and then we can use this JSON to print it in the FE =)
     */

    if(url === "/movies" && method === "GET"){
        console.log(method)
        response.setHeader("Content-Type", "application/json");
        // response.write(JSON.stringify([{name: "Harry Potter"}]));
        const movies = fileService.readFromFile("./db/movies.json")
        response.write(JSON.stringify(movies))
        response.end()

    };

    if(url === "/movies" && method === "POST"){
        console.log(method);
        console.log("I am in movies endpoint but POST method");

        let body = [];

        request
        .on("data", (dataRecieved) => {
            console.log("we recieved data...");
            console.log(dataRecieved) // BUFFER
            body.push(dataRecieved) // WE ADD THE BUFFER DATA IN THE EMPTY ARRAY
        })
        .on("end", () => {
            console.log("we are at end event");
            console.log(body)
            body = Buffer.concat(body).toString(); //WE CONVERT THE BUFFER FROM BUFFER TO STRINGIFIED JSON 
            console.log(body)

            const parsedData = JSON.parse(body); // WE PARSE THE STRINGIFIED JSON SO WE CAN USE IT
            console.log(parsedData);

            addMovie(parsedData.name) // WILL ADD A NEW MOVIE TO THE movies.json FILE =)

        })

        response.statusCode = 201;
        response.end()



    }
})


server.listen(3000, () => {
    console.log("Server is up and running...")
})