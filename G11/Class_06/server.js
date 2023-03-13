import express from "express";
import carsRouter from "./routes/car-routes.js";

const server = express();


const port = 3000;
const host = "localhost";

server.use(express.json()); //Parse req body send post HTTP method

// localhost:3000
server.get("/", (req, res) => {
    /**
     * req => argument that access the request made to the route
     * res => argument that access and provides response back to the client that requested the route
     */

    res.send("Default Route");
});


// Route Path => /cars => localhost:3000/cars
server.use("/cars", carsRouter);

server.get("*", (req, res) => {
    res.status(404).send("Route does not exist.")
});

server.post("*", (req, res) => {
    res.status(404).send("Route does not exist.")
});


server.listen(port, host, () => {
    console.log(`Server is up and running on PORT: ${port}, on HOST: ${host}.`)
});