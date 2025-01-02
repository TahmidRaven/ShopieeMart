import Supplier from '../models/supplier.models.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

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

export const signinSupplier = async (req, res, next) => {
  const { email, password } = req.body;
  console.log('signinSupplier called with:', { email, password }); // Log request data
  try {
    const validUser = await Supplier.findOne({ email });
    console.log('validUser:', validUser); // Log the found user
    if (!validUser) return res.status(404).json({ success: false, message: 'User not found!' });
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    console.log('validPassword:', validPassword); // Log password validation result
    if (!validPassword) return res.status(401).json({ success: false, message: 'Wrong credentials!' });
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json({ success: true, ...rest });
  } catch (error) {
    console.error('signinSupplier error:', error); // Log any errors
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};