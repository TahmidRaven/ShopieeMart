import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

const Mart = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1); // Add quantity state
  const [showCart, setShowCart] = useState(false); // Add state to show/hide cart

  // Fetch products from the database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data.data);
      } catch (error) {
        setError('Error fetching products');
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Load cart from local storage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  // Save cart to local storage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Handle add to cart
  const handleAddToCart = async (productId) => {
    try {
      // Log to check the click action
      console.log(`Adding product ${productId} with quantity ${quantity} to the cart`);

      // Call API to add product to the cart
      const response = await axios.post('/api/cart/add', { productId, quantity });
      console.log(`Added product ${productId} to cart`, response.data);

      // Update local cart state
      const updatedCart = [...cart];
      const existingItemIndex = updatedCart.findIndex((item) => item.productId === productId);
      if (existingItemIndex >= 0) {
        updatedCart[existingItemIndex].quantity += quantity;
      } else {
        updatedCart.push({ productId, quantity });
      }
      setCart(updatedCart);

      // Optionally save the updated cart to local storage
      localStorage.setItem('cart', JSON.stringify(updatedCart));

    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-5 font-sans">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl">Our Products</h1>
        <button
          className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          onClick={() => setShowCart(!showCart)} // Toggle showCart state
        >
          Show Cart ({cart.length})
        </button>
      </div>
      {showCart ? (
        <div className="mb-5">
          <h2 className="text-2xl mb-3">Cart</h2>
          {cart.length === 0 ? (
            <p className="text-center">Your cart is empty.</p>
          ) : (
            <ul>
              {cart.map((item, index) => {
                const product = products.find((p) => p._id === item.productId);
                return (
                  <li key={index} className="mb-2">
                    {product ? `${product.name}: ` : ''}Quantity: {item.quantity}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ) : (
        <>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block mx-auto mb-5 p-2 w-4/5 max-w-lg border border-gray-300 rounded"
          />
          {loading ? (
            <p className="text-center">Loading products...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="flex flex-wrap justify-center">
              {filteredProducts.length === 0 ? (
                <p className="text-center">No products available.</p>
              ) : (
                filteredProducts.map((product) => (
                  <div key={product._id} className="border border-gray-300 rounded p-5 m-2 w-60 text-center shadow-lg">
                    <img src={product.images[0]} alt={product.name} className="w-full h-auto mb-3" />
                    <h3 className="text-xl mb-2">{product.name}</h3>
                    <p className="mb-2">{product.description}</p>
                    <p className="mb-2">Price: ${product.price}</p>
                    <p className="mb-2">Stock: {product.stock}</p>

                    <div className="flex flex-col space-y-2 mt-3">
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="p-2 border border-gray-300 rounded"
                        min="1"
                      />
                      <button
                        onClick={() => handleAddToCart(product._id)}
                        className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Mart;
