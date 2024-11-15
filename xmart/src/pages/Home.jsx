import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-off-white text-gray-900">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-800 via-indigo-500 to-indigo-800 text-white py-16">
        <div className="container mx-auto text-center px-6 md:px-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Welcome to <span className="text-cyan-200">ShopieeMart</span>
          </h1>
          <p className="text-lg sm:text-xl mb-6">
            Your one-stop online marketplace for all your shopping needs.
          </p>
          <Link to="/shop" className="bg-cyan-400 text-white py-2 px-6 rounded-lg hover:bg-cyan-500 transition-colors text-lg">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Discount or Offers Banner */}
      <section className="bg-cyan-400 text-white py-4">
        <div className="container mx-auto text-center">
          <p className="text-lg font-semibold">
            Get 20% off on your first purchase! Use code <strong>WELCOME20</strong> at checkout.
          </p>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product 1: Lord of the Rings Trilogy */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <img src="src/assets/product00.jpg" alt="Lord of the Rings Trilogy" className="w-full h-72 object-cover mb-4 rounded-lg" />
              <h3 className="text-xl font-semibold mb-2">Lord of the Rings Trilogy</h3>
              <p className="text-gray-600 mb-4">The complete Lord of the Rings trilogy. A must-have for fantasy lovers!</p>
              <Link to="/product/1" className="text-cyan-400 hover:text-cyan-500 transition-colors">View Details</Link>
            </div>

            {/* Product 2: RTX 3070 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <img src="src/assets/product02.jpg" alt="RTX 3070" className="w-full h-72 object-cover mb-4 rounded-lg" />
              <h3 className="text-xl font-semibold mb-2">RTX 3070</h3>
              <p className="text-gray-600 mb-4">Boost your gaming experience with the powerful RTX 3070 graphics card.</p>
              <Link to="/product/2" className="text-cyan-400 hover:text-cyan-500 transition-colors">View Details</Link>
            </div>

            {/* Product 3: Hand Wipes */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <img src="src/assets/product03.jpg" alt="Hand Wipes" className="w-full h-72 object-cover mb-4 rounded-lg" />
              <h3 className="text-xl font-semibold mb-2">Hand Wipes</h3>
              <p className="text-gray-600 mb-4">Keep your hands fresh and clean with these convenient hand wipes.</p>
              <Link to="/product/3" className="text-cyan-400 hover:text-cyan-500 transition-colors">View Details</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
          <div className="flex justify-center gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-lg mb-4">"ShopieeMart made my shopping experience effortless! Highly recommend!"</p>
              <p className="font-semibold">John Doe</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-lg mb-4">"Selling on ShopieeMart helped me reach a wider audience and grow my business!"</p>
              <p className="font-semibold">Jane Smith</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Browse By Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <img src="src/assets/electronics.jpg" alt="Electronics" className="w-full h-48 object-cover mb-4 rounded-lg" />
              <h3 className="text-xl font-semibold">Electronics</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <img src="src/assets/clothing.jpg" alt="Clothing" className="w-full h-48 object-cover mb-4 rounded-lg" />
              <h3 className="text-xl font-semibold">Clothing</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <img src="src/assets/toys.jpg" alt="Toys" className="w-full h-48 object-cover mb-4 rounded-lg" />
              <h3 className="text-xl font-semibold">Toys</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <img src="src/assets/grocery.jpg" alt="Grocery" className="w-full h-48 object-cover mb-4 rounded-lg" />
              <h3 className="text-xl font-semibold">Grocery</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-indigo-900 text-white py-12">
        <div className="container mx-auto text-center px-6 md:px-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Join the ShopieeMart Community
          </h2>
          <p className="text-lg mb-6">
            Start selling your products on ShopieeMart and reach millions of customers worldwide.
          </p>
          <Link to="/signup" className="bg-cyan-400 text-white py-3 px-8 rounded-lg text-lg hover:bg-cyan-500 transition-colors">
            Sign Up to Sell
          </Link>
        </div>
      </section>

      {/* Footer Section */}
      {/* You can import your Footer component here */}
    </div>
  );
}
