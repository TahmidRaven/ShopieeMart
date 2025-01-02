import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUpSupplier() {
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
      const res = await fetch('/api/auth_supplier/signup_supplier', {
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
      navigate('/signin_supplier');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="p-6 min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-800 to-black">
      <div className="w-full max-w-lg bg-gray-800/60 backdrop-blur-md p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl text-center font-bold text-white mb-8">
          Create Supplier Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-purple-200 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-700 bg-gray-700/40 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-300"
              id="username"
              onChange={handleChange}
            />
          </div>
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-purple-200 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-700 bg-gray-700/40 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-300"
              id="email"
              onChange={handleChange}
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-purple-200 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-700 bg-gray-700/40 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-300"
              id="password"
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded-lg text-lg font-semibold uppercase hover:bg-purple-700 transition disabled:opacity-80"
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
        </form>

        {/* Footer */}
        <div className="flex justify-center gap-2 mt-6">
          <p className="text-purple-200 text-sm">Already have an account?</p>
          <Link to="/signin_supplier">
            <span className="text-purple-300 text-sm font-semibold hover:underline">
              Log In
            </span>
          </Link>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-400 text-center mt-5">{error}</p>}
      </div>
    </div>
  );
}
