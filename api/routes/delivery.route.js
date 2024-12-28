import express from 'express';
import {
  createDelivery,
  getAllDeliveries,
  getDeliveryById,
  updateDelivery,
  deleteDelivery,
} from '../controllers/delivery.controller.js';

const router = express.Router();

// Create a new delivery
router.post('/', createDelivery);

// Get all deliveries
router.get('/', getAllDeliveries);

// Get a single delivery by ID
router.get('/:id', getDeliveryById);

// Update a delivery
router.put('/:id', updateDelivery);

// Delete a delivery
router.delete('/:id', deleteDelivery);

export default router;
