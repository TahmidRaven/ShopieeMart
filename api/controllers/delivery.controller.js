import Delivery from '../models/delivery.model.js';

// Create a new delivery
export const createDelivery = async (req, res, next) => {
  try {
    const { user, orderId, deliveryOption, carrier, trackingNumber, estimatedDeliveryDate, shippingCost } = req.body;

    const newDelivery = new Delivery({
      user,
      orderId,
      deliveryOption,
      carrier,
      trackingNumber,
      estimatedDeliveryDate,
      shippingCost,
    });

    await newDelivery.save();
    return res.status(201).json({
      success: true,
      message: 'Delivery created successfully',
      data: newDelivery,
    });
  } catch (err) {
    next(err);
  }
};

// Get all deliveries
export const getAllDeliveries = async (req, res, next) => {
  try {
    const deliveries = await Delivery.find();
    return res.status(200).json({
      success: true,
      data: deliveries,
    });
  } catch (err) {
    next(err);
  }
};

// Get a delivery by ID
export const getDeliveryById = async (req, res, next) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: 'Delivery not found',
      });
    }
    return res.status(200).json({
      success: true,
      data: delivery,
    });
  } catch (err) {
    next(err);
  }
};

// Update a delivery
export const updateDelivery = async (req, res, next) => {
  try {
    const { deliveryOption, carrier, trackingNumber, estimatedDeliveryDate, shippingCost } = req.body;
    const delivery = await Delivery.findByIdAndUpdate(
      req.params.id,
      { deliveryOption, carrier, trackingNumber, estimatedDeliveryDate, shippingCost },
      { new: true }
    );
    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: 'Delivery not found',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Delivery updated successfully',
      data: delivery,
    });
  } catch (err) {
    next(err);
  }
};

// Delete a delivery
export const deleteDelivery = async (req, res, next) => {
  try {
    const delivery = await Delivery.findByIdAndDelete(req.params.id);
    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: 'Delivery not found',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Delivery deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};
