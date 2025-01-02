import Product from '../models/product.model.js';
import User from '../models/user.model.js'; // Import User model

// Create a new product
export const createProduct = async (req, res, next) => {
  try {
    const { seller } = req.body;

    // Check if seller ID exists
    const sellerExists = await User.findById(seller);
    if (!sellerExists) {
      return res.status(400).json({ success: false, message: 'Invalid seller ID' });
    }

    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

// Get all products
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    next(err);
  }
};

// Get a product by ID
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

// Update a product
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

// Delete a product
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    next(err);
  }
};
