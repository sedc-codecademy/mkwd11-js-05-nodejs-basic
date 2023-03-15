import CarsModel from "../models/cars.model.js";

const carsModel = new CarsModel();

class CarsController {
  // #2. Method in the controller that calls coresponding model's method
  async listCars() {
    const listenCars = await carsModel.getAllCars();

    // If we return JSON file we still follow MVC pattern concepts
    
    return listenCars; // #4 Returning corresponding result, that was returned from the model's method

    // If we had view:
    // IMPORTANT! => WITHOUT VIEW ENGINE
    // let htmlView = `
    //        <!DOCTYPE html>
    //         <html>
    //             <head>
    //             <title>Cars List</title>
    //             </head>
    //             <body>
    //                 <h1>Cars List</h1>
    //                 <ul>
    //     `;
    
    //     listenCars.forEach((car) => {
    //         htmlView += `
    //             <li>${car.model}</li>
    //         `
    //     })

    // htmlView += `
    //     </ul>
    //     </body>
    //     </html>

    // `

    // return htmlView // returning the view
  };

  async createCar(model, yearOfProduction, priceToRent) {
    await carsModel.createCar(model, yearOfProduction, priceToRent)
  }
}

export default CarsController;
