import InventoryModel from "../models/inventory.model.js";

const inventoryModel = new InventoryModel();

export default class InventoryController {
    async getAllItems(req, res) {
        console.log('Inventory controller get method called')
        try {
            const items = await inventoryModel.getAllItems()
            console.log('items', items)
            res.status(200).send(items);
        } catch (error) {
            res.sendStatus(500);
        }
    }
}