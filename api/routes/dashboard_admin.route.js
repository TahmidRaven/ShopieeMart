import express from 'express';
import User from '../models/user.model.js';
import Admin from '../models/admin.model.js';
import Seller from '../models/seller.model.js';
import Supplier from '../models/supplier.models.js';

const router = express.Router();

// Fetch all users based on role
router.get('/users', async (req, res) => {
  const { role } = req.query; // Get the role from query parameters
  try {
    let users = [];
    switch (role) {
      case 'admin':
        users = await Admin.find({}, '-password'); // Exclude password for security
        break;
      case 'seller':
        users = await Seller.find({}, '-password');
        break;
      case 'supplier':
        users = await Supplier.find({}, '-password');
        break;
      case 'user':
      default:
        users = await User.find({}, '-password');
        break;
    }
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users.' });
  }
});

// Delete user based on ID
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let user = await User.findById(id);
    if (!user) {
      user = await Admin.findById(id) || await Seller.findById(id) || await Supplier.findById(id);
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete user depending on their model type
    if (user instanceof User) {
      await User.findByIdAndDelete(id);
    } else if (user instanceof Admin) {
      await Admin.findByIdAndDelete(id);
    } else if (user instanceof Seller) {
      await Seller.findByIdAndDelete(id);
    } else if (user instanceof Supplier) {
      await Supplier.findByIdAndDelete(id);
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

// Update user role and move them to another collection
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    let user = await User.findById(id);
    if (!user) {
      user = await Admin.findById(id) || await Seller.findById(id) || await Supplier.findById(id);
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the role is valid
    const validRoles = ['user', 'admin', 'seller', 'supplier'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Move user based on the new role
    if (user instanceof User) {
      if (role === 'admin') {
        const newAdmin = new Admin(user.toObject()); // Create a new Admin document from User
        await newAdmin.save();
        await User.findByIdAndDelete(id); // Delete from the User collection
      } else if (role === 'seller') {
        const newSeller = new Seller(user.toObject()); // Create a new Seller document from User
        await newSeller.save();
        await User.findByIdAndDelete(id); // Delete from the User collection
      } else if (role === 'supplier') {
        const newSupplier = new Supplier(user.toObject()); // Create a new Supplier document from User
        await newSupplier.save();
        await User.findByIdAndDelete(id); // Delete from the User collection
      }
    } else if (user instanceof Admin) {
      if (role === 'user') {
        const newUser = new User(user.toObject()); // Create a new User document from Admin
        await newUser.save();
        await Admin.findByIdAndDelete(id); // Delete from the Admin collection
      } else if (role === 'seller') {
        const newSeller = new Seller(user.toObject()); // Create a new Seller document from Admin
        await newSeller.save();
        await Admin.findByIdAndDelete(id); // Delete from the Admin collection
      } else if (role === 'supplier') {
        const newSupplier = new Supplier(user.toObject()); // Create a new Supplier document from Admin
        await newSupplier.save();
        await Admin.findByIdAndDelete(id); // Delete from the Admin collection
      }
    } else if (user instanceof Seller) {
      if (role === 'user') {
        const newUser = new User(user.toObject()); // Create a new User document from Seller
        await newUser.save();
        await Seller.findByIdAndDelete(id); // Delete from the Seller collection
      } else if (role === 'admin') {
        const newAdmin = new Admin(user.toObject()); // Create a new Admin document from Seller
        await newAdmin.save();
        await Seller.findByIdAndDelete(id); // Delete from the Seller collection
      } else if (role === 'supplier') {
        const newSupplier = new Supplier(user.toObject()); // Create a new Supplier document from Seller
        await newSupplier.save();
        await Seller.findByIdAndDelete(id); // Delete from the Seller collection
      }
    } else if (user instanceof Supplier) {
      if (role === 'user') {
        const newUser = new User(user.toObject()); // Create a new User document from Supplier
        await newUser.save();
        await Supplier.findByIdAndDelete(id); // Delete from the Supplier collection
      } else if (role === 'admin') {
        const newAdmin = new Admin(user.toObject()); // Create a new Admin document from Supplier
        await newAdmin.save();
        await Supplier.findByIdAndDelete(id); // Delete from the Supplier collection
      } else if (role === 'seller') {
        const newSeller = new Seller(user.toObject()); // Create a new Seller document from Supplier
        await newSeller.save();
        await Supplier.findByIdAndDelete(id); // Delete from the Supplier collection
      }
    }

    res.status(200).json({ message: 'User role updated and moved successfully' });
  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).json({ message: 'Failed to update role' });
  }
});

export default router;
