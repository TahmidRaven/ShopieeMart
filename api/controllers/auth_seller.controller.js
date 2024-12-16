import Seller from '../models/seller.model.js';
import bcryptjs from 'bcryptjs';

export const signupSeller = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new Seller({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json('User created successfully!');
  
} catch (error) {
  next(error);
}
};