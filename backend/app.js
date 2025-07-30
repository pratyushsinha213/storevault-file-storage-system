import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
const app = express();

import { PORT } from './config/env.js';
import connectToDatabase from './config/db.js';
import fileRouter from './routes/file.routes.js';
import analyticsRouter from './routes/analytics.routes.js';
import userRouter from './routes/user.routes.js';
// import redis from './services/redisClient.js';
import aiRouter from './routes/ai.routes.js';
import stripeRouter from './routes/stripe.routes.js';

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const allowedOrigin = process.env.NODE_ENV === "environment" ? process.env.CLIENT_BASE_URL : "http://localhost:5173"; 

app.use(cors({
  origin: '*', // or restrict to Vercel frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  credentials: true, // Allow cookies to be sent with requests
}));

app.use('/api/v1/files', fileRouter);
app.use('/api/v1/analytics', analyticsRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/ai-assistant', aiRouter);
app.use('/api/v1/payments', stripeRouter);

// app.get('/test-redis', async (req, res) => {
//   await redis.set('testkey', 'hello');
//   const value = await redis.get('testkey');
//   res.json({ value });
// });

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT} (Press CTRL+C to stop)`);
  connectToDatabase();
})