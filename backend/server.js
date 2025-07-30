// server.js or index.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import subcategoryRoutes from './routes/subcategoryRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

const app = express();
const port = process.env.PORT || 5000;

// ✅ Allow all origins for CORS
app.use(
  cors({
    origin: '*', // allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    credentials: false, // set to true only if using cookies or auth headers
    optionsSuccessStatus: 204,
  })
);

// ✅ Handle preflight requests
app.options('*', cors());

// ✅ Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ✅ Connect to MongoDB
connectDB();

// ✅ Routes
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/category', categoryRoutes);
app.use('/api/subcategory', subcategoryRoutes);
app.use('/api/contact', contactRoutes);

// ✅ Health check route
app.get('/', (req, res) => {
  res.send('API is running');
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

// ✅ Start server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
