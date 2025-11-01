const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  // Check if token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Access denied. No token provided.",
    });
  }

  // Extract token (format: "Bearer <token>")
  const bearerToken = token.startsWith("Bearer ") ? token.slice(7) : token;

  // Validate against environment variable
  const validToken = process.env.ADMIN_TOKEN || "your-secret-admin-token";

  if (bearerToken !== validToken) {
    return res.status(403).json({
      success: false,
      error: "Access denied. Invalid token.",
    });
  }

  next();
};

module.exports = authMiddleware;
