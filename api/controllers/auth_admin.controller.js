import Admin from '../models/admin.model.js';
import bcryptjs from 'bcryptjs';

export const signupAdmin = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newAdmin = new Admin({ username, email, password: hashedPassword });

  try {
    await newAdmin.save();
    res.status(201).json('Admin created successfully!');
  } catch (error) {
    res.status(500).json(error.message);
  }
};
