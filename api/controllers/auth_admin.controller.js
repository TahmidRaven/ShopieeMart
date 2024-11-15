import Admin from '../models/admin.model.js';
import bcryptjs from 'bcryptjs';

export const signupAdmin = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newAdmin = new Admin({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json('User created successfully!');
  
} catch (error) {
  next(error);
}
};