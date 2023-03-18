import {v4 as uuid} from "uuid"

class Motor {
    constructor(model, make, year, engineSize, color, price){
        this.id = uuid();
        this.model = model;
        this.make = make;
        this.year = year;
        this.engineSize = engineSize;
        this.color = color;
        this.price = price;
    }
}

export default Motor