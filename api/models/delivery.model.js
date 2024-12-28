import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order', // You can create an Order model if needed
      required: true,
    },
    deliveryOption: {
      type: String,
      enum: ['Standard', 'Express', 'Same-Day'],
      required: true,
    },
    carrier: {
      type: String,
      enum: ['Sundarban Courier Service', 'RedX', 'FedEx', 'Pathao'],
      required: true,
    },
    trackingNumber: {
      type: String,
      required: true,
    },
    estimatedDeliveryDate: {
      type: Date,
      required: true,
    },
    shippingCost: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Delivery = mongoose.model('Delivery', deliverySchema);

export default Delivery;
