import fileService from "../shared-services/file-service.js";
import path from "path";
import Motor from "../entities/motor.entity.js";

class MotorsModel {
  _path_to_motors = path.join(".", "db", "motor-bikes.json");

  async getAllMotors() {
    const rawMotors = await fileService.readFile(this._path_to_motors);
    const motors = JSON.parse(rawMotors);

    return motors;
  }

  async getById(id) {
    // return new Promise(async (resolve, reject) => {
    //   const rawMotors = await fileService.readFile(this._path_to_motors);
    //   const motors = JSON.parse(rawMotors);

    //   const motorFound = motors.find((motor) => motor.id === id);

    //   if (motorFound) {
    //     resolve(motorFound);
    //   } else {
    //     reject({ message: `Motor with id: ${id}, was not found.` });
    //   }
    // });

    const rawMotors = await fileService.readFile(this._path_to_motors);
    const motors = JSON.parse(rawMotors);
    
    const motorFound = motors.find((motor) => motor.id === id);

    if(motorFound === undefined){
        throw new Error(`Motor with id: ${id} was not found.`)
    };

    return motorFound

  }

  async addMotorBike(model, make, year, engineSize, color, price){
    const rawMotors = await fileService.readFile(this._path_to_motors);
    const motors = JSON.parse(rawMotors);

    const motor = new Motor(model, make, year, engineSize, color, price);

    motors.push(motor);

    await fileService.writeFile(this._path_to_motors, JSON.stringify(motors, null, 2));
  }
}

export default MotorsModel;
