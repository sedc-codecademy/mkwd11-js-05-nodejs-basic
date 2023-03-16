import express from 'express';
import InventoryController from '../controllers/inventory.controller.js';

const inventoryController = new InventoryController();

const router = express.Router();

//api/inventory
router.get('', inventoryController.getAllItems)

export default router;