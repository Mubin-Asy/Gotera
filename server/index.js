/**
 * index.js - Gotera Backend Server
 * Aligned with 'Web Development with Node and Express' (Ethan Brown)
 * 
 * Express application initialization:
 * - Environment variable configuration
 * - Middleware pipeline (CORS, body parser, logging)
 * - REST API routing registration
 * - Centralized 404 & 500 error handling
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db/connection');
const loggerMiddleware = require('./middleware/logger');
const { notFoundHandler, serverErrorHandler } = require('./middleware/errorHandlers');
const apiRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// 1. Basic Middleware Pipeline
app.use(cors({
  origin: '*', // Allow frontend Vite dev server
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);

// 2. Base API Routes
app.use('/api', apiRoutes);

// 3. Root welcome endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Gotera – National Emergency Management System API',
    endpoints: {
      inventory: '/api/inventory',
      warehouses: '/api/warehouses',
      collections: '/api/collections',
      stats: '/api/stats/overview',
      auth: '/api/auth'
    }
  });
});

// 4. Ethan Brown's 404 & 500 Error Handlers
app.use(notFoundHandler);
app.use(serverErrorHandler);

// 5. Start Server
const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`[Gotera Server] Running on http://localhost:${PORT}`);
  console.log(`[Architecture] Express 5.x / MongoDB in Action`);
  console.log(`====================================================`);
});

module.exports = { app, server };
