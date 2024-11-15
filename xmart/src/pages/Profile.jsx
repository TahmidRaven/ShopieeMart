import { Link } from 'react-router-dom';

export default function Profile() {
  // Sample user data. Replace with actual user data from your state or API
  const user = {
    username: 'JohnDoe',
    email: 'johndoe@example.com',
  };

  return (
    <div className="p-6 min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-800 via-lavender-600 to-purple-600">
      <div className="w-full max-w-lg bg-white/20 backdrop-blur-lg p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl text-center font-bold text-white mb-8">
          Welcome, {user.username}!
        </h1>

        {/* Profile Information */}
        <div className="space-y-6 mb-6">
          <div className="flex justify-between">
            <p className="text-lavender-200">Username:</p>
            <p className="text-black font-semibold">{user.username}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-lavender-200">Email:</p>
            <p className="text-black font-semibold">{user.email}</p>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="flex justify-center mb-6">
          <Link
            to="/edit-profile"
            className="bg-orange-600 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-orange-700 transition"
          >
            Edit Profile
          </Link>
        </div>

        {/* Sign Out Button */}
        <div className="flex justify-center">
          <Link
            to="/signin"
            className="bg-red-600 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-red-700 transition"
          >
            Sign Out
          </Link>
        </div>
      </div>
    </div>
  );
}
