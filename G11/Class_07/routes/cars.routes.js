import express from "express";
import CarsController from "../controllers/cars.controller.js";

const carsController = new CarsController();
const carsRouter = express.Router();

// localhost:3000/cars
carsRouter.get("/", async (req, res) => {
    // #1. Request is received in the router;
    //     the router calls coresponding controller's method
    const cars = await carsController.listCars();

    // #5. Returning the result back to the user
    res.send(cars);
});

//localhost:3000/cars
carsRouter.post('/', async (req, res) => {
    const body = req.body;

    if(!body.model || !body.yearOfProduction || !body.priceToRent){
        res.status(400).send({message: "Request body invalid"});
        return;
    }

    await carsController.createCar(body.model, body.yearOfProduction, body.priceToRent);

    res.status(201).send({message: "Car was created."})
})

export default carsRouter;