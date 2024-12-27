import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardAdmin = () => {
  const [users, setUsers] = useState([]); // State to hold user data
  const [loading, setLoading] = useState(true); // Loading state
  const [roleType, setRoleType] = useState('all'); // Filter role type
  const [searchQuery, setSearchQuery] = useState(''); // Search query for users
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const usersPerPage = 20; // Number of users per page

  // Fetch users on component mount and roleType/searchQuery change
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Set loading state
      try {
        const response = await axios.get('http://localhost:3000/api/dashboard_admin/users', {
          params: { 
            role: roleType === 'all' ? undefined : roleType,
          },
        });
        setUsers(response.data); // Set users state with fetched data
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false); // Reset loading state
      }
    };

    fetchUsers();
  }, [roleType, searchQuery]);

  // Handle user deletion with confirmation
  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/dashboard_admin/users/${userId}`);

        if (response.status === 200) {
          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId)); // Remove user from state
        } else {
          console.error('Failed to delete user. Server responded with:', response.status);
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('There was an error while deleting the user. Please try again.');
      }
    }
  };

  // Handle role change
  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(`http://localhost:3000/api/dashboard_admin/users/${userId}`, { role: newRole });
      setUsers(users.map((user) => (user._id === userId ? { ...user, role: newRole } : user)));
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Filter users by search query
  const filteredUsers = currentUsers.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

        {/* Search bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-2 py-1 bg-gray-100 rounded border"
          />
        </div>

        {/* Role Filter */}
        <div className="mb-4">
          <label htmlFor="roleType" className="mr-2 font-medium">Filter by Role:</label>
          <select
            id="roleType"
            value={roleType}
            onChange={(e) => setRoleType(e.target.value)}
            className="px-2 py-1 bg-gray-100 rounded border"
          >
            <option value="all">All</option>
            <option value="user">Users</option>
            <option value="supplier">Suppliers</option>
            <option value="seller">Sellers</option>
            <option value="admin">Admins</option>
          </select>
        </div>

        {/* Users Table */}
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
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="border-t">
                    <td className="px-4 py-2 text-sm text-gray-700">{user.username}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{user.email}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className="px-2 py-1 bg-gray-100 rounded border"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="supplier">Supplier</option>
                        <option value="seller">Seller</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 text-sm">
                      <button
                        onClick={() => handleRoleChange(user._id, user.role)} // Update role functionality
                        className="bg-blue-500 text-white px-4 py-2 rounded mx-2"
                      >
                        Update Role
                      </button>

                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4">
          {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className="px-3 py-1 bg-gray-200 rounded mx-1"
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
