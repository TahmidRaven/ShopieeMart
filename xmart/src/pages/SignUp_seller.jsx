import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUpseller() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth_seller/signup_seller', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/signin_seller'); // Redirect to an seller-specific page
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="p-6 min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-800 via-lavender-600 to-purple-600">
      <div className="w-full max-w-lg bg-white/20 backdrop-blur-lg p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl text-center font-bold text-white mb-8">
          Create Seller Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-lavender-200 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your Name"
              className="w-full border border-gray-300 bg-white/20 text-black p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-lavender-500 placeholder-gray-600"
              id="username"
              onChange={handleChange}
            />
          </div>
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-lavender-200 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 bg-white/20 text-black p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-lavender-500 placeholder-gray-600"
              id="email"
              onChange={handleChange}
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-lavender-200 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 bg-white/20 text-black p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-lavender-500 placeholder-gray-600"
              id="password"
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            className="w-full bg-orange-600 text-white py-3 rounded-lg text-lg font-semibold uppercase hover:bg-orange-700 transition disabled:opacity-80"
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
        </form>

        {/* Footer */}
        <div className="flex justify-center gap-2 mt-6">
          <p className="text-white text-sm">Already have an account?</p>
          <Link to="/signin_seller">
            <span className="text-lavender-200 text-sm font-semibold hover:underline">
              Log In
            </span>
          </Link>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mt-5">{error}</p>}
      </div>
    </div>
  );
}
