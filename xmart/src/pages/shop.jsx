import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Import default product image
import defaultImage from '../assets/productx.jpg';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [review, setReview] = useState('');
  const [reviewer, setReviewer] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products'); // Adjust the URL if necessary
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Add a review to a product
  const handleAddReview = async (productId) => {
    try {
      await axios.post(`/api/products/${productId}/review`, { review, reviewer });
      setReview('');
      setReviewer('');
      alert('Review added successfully!');
      const response = await axios.get('/api/products'); // Refetch products
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  // Add product to the cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`${product.name} added to cart!`);
  };

  // Handle buying a product
  const handleBuyNow = (product) => {
    alert(`Thanks for purchasing ${product.name}!`);
    // Add purchase logic here if needed
  };

  return (
    <div className="bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Shopiee</h1>
          <p className="text-lg">Find your favorite products and leave a review!</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-6">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <img
                src={product.images?.[0] || defaultImage}
                alt={product.name}
                className="w-full h-72 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-lg font-bold mb-4">${product.price.toFixed(2)}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleBuyNow(product)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Buy Now
                </button>
              </div>
              <button
                onClick={() => setSelectedProduct(product)}
                className="mt-4 text-sm text-indigo-600 hover:underline"
              >
                Add Review
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Review Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Review {selectedProduct.name}</h2>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
              value={reviewer}
              onChange={(e) => setReviewer(e.target.value)}
            />
            <textarea
              placeholder="Write your review..."
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
              rows="4"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-red-500 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAddReview(selectedProduct._id)}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
