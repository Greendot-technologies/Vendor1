
// const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {
//   const token = req.headers["authorization"]?.split(" ")[1];

//   console.log("🔍 Debugging verifyToken - Token Received:", token); // Log received token

//   if (!token) {
//     return res.status(401).json({ error: "No token provided" });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       console.error("❌ Token verification failed:", err.message);
//       return res.status(403).json({ error: "Invalid token" });
//     }

//     console.log("✅ Token Decoded Successfully:", decoded); // Log decoded token
//     req.vendor = decoded; // major change: use decoded token to set req.vendor instead of req.user
//     next();
//   });
// };

// module.exports = { verifyToken };

const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request as 'user'
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

// Middleware to authorize specific roles (e.g., 'admin', 'vendor')
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;
    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({ error: "Access denied: insufficient role" });
    }
    next();
  };
};

module.exports = { verifyToken, authorizeRoles };
