import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

const MyCart = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  // Load cart from local storage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  // Fetch product details for cart items
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Save cart to local storage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Handle quantity change
  const handleQuantityChange = async (productId, quantity) => {
    const updatedCart = cart.map((item) =>
      item.productId === productId ? { ...item, quantity: Number(quantity) } : item
    );
    setCart(updatedCart);

    try {
      await axios.put('/api/cart/update', { productId, quantity });
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  // Handle remove from cart
  const handleRemoveFromCart = async (productId) => {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    setCart(updatedCart);

    try {
      await axios.delete('/api/cart/remove', { data: { productId } });
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  const getProductDetails = (productId) => {
    return products.find((product) => product._id === productId);
  };

  return (
    <div className="p-5 font-sans">
      <h1 className="text-3xl text-center mb-5">My Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center">No items in the cart.</p>
      ) : (
        <div className="flex flex-col items-center">
          {cart.map((item) => {
            const product = getProductDetails(item.productId);
            return (
              <div key={item.productId} className="border border-gray-300 rounded p-5 m-2 w-60 text-center shadow-lg">
                {product && (
                  <>
                    <p className="text-xl mb-2">{product.name}</p>
                    <p className="mb-2">Price: ${product.price}</p>
                  </>
                )}
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.productId, e.target.value)}
                  className="p-2 border border-gray-300 rounded mb-2"
                  min="1"
                />
                <button
                  onClick={() => handleRemoveFromCart(item.productId)}
                  className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                >
                  Remove from Cart
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyCart;
