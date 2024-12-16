import Supplier from '../models/supplier.models.js';
import bcryptjs from 'bcryptjs';

export const signupSupplier = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new Supplier({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json('User created successfully!');
  
} catch (error) {
  next(error);
}
};