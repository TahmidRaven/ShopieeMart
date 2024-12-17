import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DashboardAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleType, setRoleType] = useState('user'); // Default role type to 'user'

  // Fetch users when component mounts or when roleType changes
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        let response;
        // Conditional API endpoint based on roleType
        if (roleType === 'user') {
          response = await axios.get('http://localhost:3000/api/auth/signup');
        } else if (roleType === 'supplier') {
          response = await axios.get('http://localhost:3000/api/auth_supplier/signup_supplier');
        } else if (roleType === 'seller') {
          response = await axios.get('http://localhost:3000/api/auth_seller/signup_seller');
        } else if (roleType === 'admin') {
          response = await axios.get('http://localhost:3000/api/auth_admin/signup_admin');
        }
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [roleType]);

  // Handle user deletion
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/users/${userId}`); // Adjusted endpoint
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Handle role update
  const handleUpdateRole = async (userId, newRole) => {
    try {
      await axios.put(`http://localhost:3000/api/admin/users/${userId}`, { role: newRole });
      setUsers(users.map(user => user._id === userId ? { ...user, role: newRole } : user));
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

        <div className="mb-4">
          <label htmlFor="roleType" className="mr-2">Filter by Role:</label>
          <select
            id="roleType"
            value={roleType}
            onChange={(e) => setRoleType(e.target.value)}
            className="px-2 py-1 bg-gray-100 rounded"
          >
            <option value="user">Users</option>
            <option value="supplier">Suppliers</option>
            <option value="seller">Sellers</option>
            <option value="admin">Admins</option>
          </select>
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Username</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Role</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">Loading...</td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user._id} className="border-t">
                    <td className="px-4 py-2 text-sm text-gray-700">{user.username}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{user.email}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      <select
                        value={user.role}
                        onChange={(e) => handleUpdateRole(user._id, e.target.value)}
                        className="px-2 py-1 bg-gray-100 rounded"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 text-sm">
                      <Link
                        to={`/admin/users/edit/${user._id}`}
                        className="text-blue-500 hover:underline mr-4"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
