/**
 * errorHandlers.js
 * Aligned with 'Web Development with Node and Express' (Ethan Brown) Ch. 3 & Ch. 12
 * 
 * Standardized 404 (Not Found) and 500 (Internal Server Error) handlers
 */

// Custom 404 handler (must be placed after all defined routes)
exports.notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    status: 404,
    message: `Resource not found: ${req.method} ${req.originalUrl}`
  });
};

// Centralized error-handling middleware (4 parameters: err, req, res, next)
exports.serverErrorHandler = (err, req, res, next) => {
  console.error('[Error Middleware]:', err.stack || err.message);

  // Mongoose validation error handling
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({
      success: false,
      status: 400,
      message: 'Validation Error',
      errors: messages
    });
  }

  // Mongoose duplicate key error (code 11000)
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: 'Duplicate record error: key already exists'
    });
  }

  // Default server error
  res.status(err.status || 500).json({
    success: false,
    status: err.status || 500,
    message: err.message || 'Internal Server Error'
  });
};
