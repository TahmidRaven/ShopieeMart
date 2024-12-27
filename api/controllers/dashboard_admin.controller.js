// import User from '../models/user.model.js';
// import Supplier from '../models/supplier.model.js';
// import Seller from '../models/seller.model.js';
// import Admin from '../models/admin.model.js';

// // Controller for fetching all users
// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find(); // Fetch all users from the User collection
//     res.json(users);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({ message: 'Error fetching users' });
//   }
// };

// // Controller for fetching all suppliers
// export const getAllSuppliers = async (req, res) => {
//   try {
//     const suppliers = await Supplier.find(); // Fetch all suppliers from the Supplier collection
//     res.json(suppliers);
//   } catch (error) {
//     console.error('Error fetching suppliers:', error);
//     res.status(500).json({ message: 'Error fetching suppliers' });
//   }
// };

// // Controller for fetching all sellers
// export const getAllSellers = async (req, res) => {
//   try {
//     const sellers = await Seller.find(); // Fetch all sellers from the Seller collection
//     res.json(sellers);
//   } catch (error) {
//     console.error('Error fetching sellers:', error);
//     res.status(500).json({ message: 'Error fetching sellers' });
//   }
// };

// // Controller for fetching all admins
// export const getAllAdmins = async (req, res) => {
//   try {
//     const admins = await Admin.find(); // Fetch all admins from the Admin collection
//     res.json(admins);
//   } catch (error) {
//     console.error('Error fetching admins:', error);
//     res.status(500).json({ message: 'Error fetching admins' });
//   }
// };

// // Controller for deleting a user
// export const deleteUser = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     await User.findByIdAndDelete(userId);
//     res.json({ message: 'User deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     res.status(500).json({ message: 'Error deleting user' });
//   }
// };

// // Controller for updating user role (e.g., admin, user)
// export const updateUserRole = async (req, res) => {
//   const { userId } = req.params;
//   const { role } = req.body;

//   try {
//     const updatedUser = await User.findByIdAndUpdate(userId, { role }, { new: true });
//     res.json(updatedUser);
//   } catch (error) {
//     console.error('Error updating user role:', error);
//     res.status(500).json({ message: 'Error updating user role' });
//   }
// };
