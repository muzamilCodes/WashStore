export const errorHandler = (err, req, res, next) => {
  console.error("Internal Server Error:", err);
  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};
