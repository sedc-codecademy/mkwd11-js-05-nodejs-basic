import fileService from "../shared-services/file-service.js";
import {Car} from "../entities/cars.entity.js";

class CarsModel  {
    // #3 Method in model that does the heavy lifting logic
    //    and returns coresponding result back to the controller
    async getAllCars(){
        const rawCars = await fileService.readFile("./db/cars.json");
        const cars = JSON.parse(rawCars);

        return cars;
    }

    async createCar(model, yearOfProduction, priceToRent){   
        const rawCars = await fileService.readFile("./db/cars.json");
        const cars = JSON.parse(rawCars);

        const car = new Car(model, yearOfProduction, priceToRent);

        cars.push(car);

        await fileService.writeFile("./db/cars.json", JSON.stringify(cars, null, 2));
    }
};

export default CarsModel;