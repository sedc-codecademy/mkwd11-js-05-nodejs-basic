import InventoryModel from "../models/inventory.model.js";

const inventoryModel = new InventoryModel();

export default class InventoryController {
    async getAllItems(req, res) {
        const shouldGetAllItems = !req.params.id;
        try {
            if (shouldGetAllItems) {
                const items = await inventoryModel.getAllItems()
                res.status(200).send(items);
            } else {
                const item = await inventoryModel.getItemById(req.params.id);
                res.status(200).send(item)
            }
        } catch (error) {
            res.sendStatus(500);
        }
    }

    async addInventoryItem(req, res) {
        const body = req.body;

        try {
            const createdItem = await inventoryModel.addInventoryItem(body)
            res.status(201).send(createdItem)
        } catch (error) {
            res.status(400).send('Creating item failed')
        }
    }

    async updateInventoryItem(req, res) {
        const id = req.params.id;
        const body = req.body;

        try {
            const updatedItem = await inventoryModel.updateInventoryItem(id, body)
            res.status(200).send(updatedItem)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }

    async deleteInventoryItem(req, res) {
        const id = req.params.id;

        try {
            await inventoryModel.deleteInventoryItem(id);
            res.sendStatus(200)
        } catch (error) {
            res.sendStatus(500)
        }
    }
}