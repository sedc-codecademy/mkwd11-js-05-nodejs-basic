import * as dataService from '../services/data.service.js'
import { v4 as uuidv4 } from 'uuid';

const inventoryDataPath = './data/inventory.json'

export default class InventoryModel {
    getAllItems() {
        return new Promise((resolve, reject) => {
            const inventoryItems = dataService.readData(inventoryDataPath);
            resolve(inventoryItems);
        })
    }

    getItemById(id) {
        return new Promise(async (resolve, reject) => {
            const items = await this.getAllItems()

            const item = items.find(item => item.id === id)

            if (!item) {
                reject('Item not found')
            }

            resolve(item)
        })
    }

    addInventoryItem(body) {
        return new Promise(async (resolve, reject) => {
            const items = await this.getAllItems()

            const createdInventoryItem = {
                ...body,
                id: uuidv4()
            }
            items.push(createdInventoryItem);

            dataService.writeData(inventoryDataPath, items)

            resolve(createdInventoryItem)
        })
    }

    updateInventoryItem(id, body) {
        return new Promise(async (resolve, reject) => {
            const items = await this.getAllItems();

            const index = items.findIndex(item => item.id === id)

            if (index === -1) {
                reject(`Item with id:${id} can't be found`)
            }

            items[index] = {
                ...body,
                id
            }

            dataService.writeData(inventoryDataPath, items);

            resolve(items[index])
        })
    }

    deleteInventoryItem(id) {
        return new Promise(async (resolve, reject) => {
            const items = await this.getAllItems()

            const filteredItems = items.filter(item => item.id !== id);

            dataService.writeData(inventoryDataPath, filteredItems)

            resolve()
        })
    }
}