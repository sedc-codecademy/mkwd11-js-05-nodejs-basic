import {v4 as uuidV4} from "uuid"

export class Car {
    constructor(model, yearOfProduction, priceToRent ) {
        this.id = uuidV4();
        this.model = model;
        this.yearOfProduction = yearOfProduction;
        this.isAvailable = true;
        this.priceToRent = priceToRent;
    }
}