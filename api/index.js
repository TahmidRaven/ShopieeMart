import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Import cors
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import authAdminRouter from './routes/auth_admin.route.js';
import authSellerRouter from './routes/auth_seller.route.js';
import authSupplierRouter from './routes/auth_supplier.route.js';
import dashboardAdminRouter from './routes/dashboard_admin.route.js';
import productRouter from './routes/product.route.js';
import deliveryRouter from './routes/delivery.route.js';

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

// Enable CORS for your frontend origin
app.use(
  cors({
    origin: 'http://localhost:5173', // Allow only your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true, // Allow credentials if needed
  })
);

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/auth_admin', authAdminRouter);
app.use('/api/auth_seller', authSellerRouter);
app.use('/api/auth_supplier', authSupplierRouter);
app.use('/api/dashboard_admin', dashboardAdminRouter);

app.use('/api/products', productRouter);
app.use('/api/delivery', deliveryRouter); 

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});
