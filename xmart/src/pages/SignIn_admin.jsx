import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';

export default function SignIn_admin() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth_admin/signin_admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await res.text();
        console.error('Expected JSON, got:', text); // Log the unexpected response
        throw new Error('Unexpected response format');
      }
      const data = await res.json();
      console.log('Parsed response data:', data); // Log the parsed response data
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.error('handleSubmit error:', error); // Log any errors
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="p-6 min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">
      <div className="w-full max-w-lg bg-blue-800/60 backdrop-blur-md p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl text-center font-bold text-white mb-8">
          Sign In to Your Admin Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-blue-200 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-700 bg-gray-700/40 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-blue-200 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-700 bg-gray-700/40 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300"
              id="password"
              onChange={handleChange}
            />
          </div>
          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold uppercase hover:bg-blue-700 transition disabled:opacity-80"
          >
            {loading ? 'Loading...' : 'Sign In'}
          </button>
        </form>
        <div className="flex justify-center gap-2 mt-6">
          <p className="text-blue-200 text-sm">Don't have an account?</p>
          <Link to="/signup_admin">
            <span className="text-blue-300 text-sm font-semibold hover:underline">
              Sign Up
            </span>
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </div>
  );
}
