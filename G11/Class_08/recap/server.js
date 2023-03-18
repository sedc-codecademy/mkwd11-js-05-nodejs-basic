import express from "express";
import carsRouter from "./routes/cars.routes.js";
import motorBikesRouter from "./routes/motors-bikes.routes.js";

const app = express();

app.use(express.json());

app.use("/cars", carsRouter);
app.use("/motors", motorBikesRouter);

/**
 * USING MVC
 * make functionallity to display all motorbikes on route /motor_bikes
 */

app.listen(3000, () => {
    console.log("Server is up and running on port: 3000...")
});