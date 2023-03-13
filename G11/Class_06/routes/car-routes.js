import express from "express";
import fileService from "../shared-services/file-service.js"
import { v4 as uuidV4 } from "uuid"; 
//GET CARS, GET CAR BY ID, RENT A CAR, DELETE A CAR BY ID

const carsRouter = express.Router();

// localhost:3000/cars && GET HTTP METHOD
carsRouter.get("/", async (req, res) => {
    const queryParams = req.query;
    console.log(queryParams)

    const rawCars = await fileService.readFile("./db/cars.json");
    const cars = JSON.parse(rawCars);

    if(queryParams.available === 'true'){
        const filteredCars = cars.filter((car) => car.isAvailable) // car.isAvailable === true;
        res.send(filteredCars);
        return;
    }else if(queryParams.available === 'false'){
        const filteredCars = cars.filter((car) => !car.isAvailable) // car.isAvailable !== true;
        res.send(filteredCars);
        return;
    }
    res.send(cars);
});

// localhost:3000/cars && POST HTTP METHOD
carsRouter.post("/", async (req, res) => {
    const rawCars = await fileService.readFile("./db/cars.json");
    const cars = JSON.parse(rawCars);

    const body = req.body;

    const car = {
        id: uuidV4(),
        model: body.model,
        yearOfProduction: body.yearOfProduction,
        isAvailable: true,
        priceToRent: body.priceToRent
    };


    cars.push(car);


    await fileService.writeFile("./db/cars.json", JSON.stringify(cars, null, 2));
    res.status(201).send({message: "Car was added in the JSON."});
});

// localhost:3000/cars/1
carsRouter.get("/:id", async (req, res) => {
    const id = req.params.id;

    const rawCars = await fileService.readFile("./db/cars.json");
    const cars = JSON.parse(rawCars);

    const foundCar = cars.find((car) => car.id === id);

    if(foundCar === undefined){
        res.status(404).send({message: `Car with id: ${id} was not found`});
    }
    else {
        res.send(foundCar)
    }

});

carsRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;

    const rawCars = await fileService.readFile("./db/cars.json");
    const cars = JSON.parse(rawCars);

    const filteredCars = cars.filter((car) => car.id !== id);

    if(filteredCars.length === cars.length){
        res.status(404).send({message: `Car with id: ${id} does not exist.`});
        return;
    }

    await fileService.writeFile("./db/cars.json", JSON.stringify(filteredCars, null, 2));

    res.send({message: "Car was deleted."})
});

// PUT & PATCH;
carsRouter.patch("/:id", async (req, res) => {
    const id = req.params.id;

    const rawCars = await fileService.readFile("./db/cars.json");
    const cars = JSON.parse(rawCars);

    // find will mutate the original value; NOT RECOMMENDED
    // let foundCar = cars.find((car) => car.id === id);
    // foundCar.isAvailable = false;

    const editedCars = cars.map((car) => {
        if(car.id === id){
            car.isAvailable = false;
            return car;

            // return {
            //     ...car, //will copy all the properties of the object
            //     isAvailable: false
            // }
        }
        return car;
    })


    await fileService.writeFile("./db/cars.json", JSON.stringify(editedCars, null, 2));

    res.sendStatus(200)
})

export default carsRouter;