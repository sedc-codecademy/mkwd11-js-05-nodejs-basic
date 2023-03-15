import express from "express";
import carsRouter from "./routes/cars.routes.js";


const app = express();

app.use("/cars", carsRouter);

app.listen(3000, () => {
    console.log("Server is up and running on port: 3000...")
});