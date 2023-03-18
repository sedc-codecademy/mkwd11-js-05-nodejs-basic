import MotorsModel from "../models/motors.model.js";

const motorsModel = new MotorsModel();

class MotorsController {
    async getMotors(){
        const motors = await motorsModel.getAllMotors();
        return motors;
    }

    async getById(id){
        const motorsById = await motorsModel.getById(id);
        return motorsById
    }

    async addMotor(model, make, year, engineSize, color, price){
        await motorsModel.addMotorBike(model, make, year, engineSize, color, price)
    }
};


export default MotorsController;