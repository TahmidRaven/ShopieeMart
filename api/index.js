import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import authAdminRouter from './routes/auth_admin.route.js';
import authSellerRouter from './routes/auth_seller.route.js';
import authSupplierRouter from './routes/auth_supplier.route.js';

// import dashboardAdminRouter from '.routes/dashboard_admin.route.js';


dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use('/api/auth_admin', authAdminRouter);
app.use('/api/auth_seller', authSellerRouter);
app.use('/api/auth_supplier', authSupplierRouter);

// app.use('/api/dashboard_admin', dashboardAdminRouter); //// dashboard admin don't work



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

