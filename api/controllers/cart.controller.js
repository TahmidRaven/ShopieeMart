import Cart from '../models/cart.model.js';

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    // Check if the product already exists in the cart
    let cartItem = await Cart.findOne({ productId: productId });

    if (cartItem) {
      // If it exists, update the quantity
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // If not, create a new cart item
      cartItem = new Cart({ productId, quantity });
      await cartItem.save();
    }

    res.status(200).json({ success: true, message: 'Product added to cart', data: cartItem });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
