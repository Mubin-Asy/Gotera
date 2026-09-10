/**
 * logger.js
 * Aligned with 'Web Development with Node and Express' (Ethan Brown)
 * 
 * Idiomatic middleware for structured request logging
 */

module.exports = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[HTTP] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
};
