// src/middleware/authMiddleware.js

const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ error: "Authorization header missing or invalid" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
}

function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    
    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: "Access denied: insufficient permissions" });
    }
    next();
  };
}

module.exports = { authenticateToken, authorizeRoles };
