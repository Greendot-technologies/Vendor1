

// // module.exports = { verifyToken, authorizeRoles };
// const jwt = require("jsonwebtoken");

// // Middleware to verify JWT token and store id, role, email
// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader?.split(" ")[1]; // Expecting "Bearer <token>"

//   if (!token) {
//     return res.status(401).json({ error: "No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Check if required fields are in the token
//     if (!decoded.id || !decoded.role || !decoded.email) {
//       return res.status(400).json({ error: "Invalid token payload" });
//     }

//     // Attach user info to request
//     req.user = {
//       id: decoded.id,
//       role: decoded.role,
//       email: decoded.email
//     };

//     next();
//   } catch (err) {
//     console.error("JWT Verification Error:", err.message);
//     return res.status(403).json({ error: "Invalid token" });
//   }
// };

// // Middleware to authorize based on roles
// const authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     const userRole = req.user?.role;

//     if (!userRole || !roles.includes(userRole)) {
//       return res.status(403).json({ error: "Access denied: insufficient role" });
//     }

//     next();
//   };
// };

// module.exports = { verifyToken, authorizeRoles };




// const jwt = require("jsonwebtoken");

// // Middleware to verify JWT token and store id, role, email
// const verifyToken = (req, res, next) => {
//   // Ensure the JWT secret is loaded
//   if (!process.env.JWT_SECRET) {
//     console.error("JWT_SECRET is not defined in environment variables.");
//     return res
//       .status(500)
//       .json({ error: "Server configuration error: JWT secret missing" });
//   }

//   const authHeader = req.headers["authorization"];
//   const token = authHeader?.split(" ")[1]; // Expecting "Bearer <token>"

//   if (!token) {
//     return res.status(401).json({ error: "No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Check if required fields are in the token
//     if (!decoded.id || !decoded.role || !decoded.email) {
//       return res.status(400).json({ error: "Invalid token payload" });
//     }

//     // Attach user info to request
//     req.user = {
//       id: decoded.id,
//       role: decoded.role,
//       email: decoded.email,
//     };

//     next();
//   } catch (err) {
//     console.error("JWT Verification Error:", err.message);
//     return res.status(403).json({ error: "Invalid token" });
//   }
// };

// // Middleware to authorize based on roles
// const authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     const userRole = req.user?.role;

//     if (!userRole || !roles.includes(userRole)) {
//       return res
//         .status(403)
//         .json({ error: "Access denied: insufficient role" });
//     }

//     next();
//   };
// };

// module.exports = { verifyToken, authorizeRoles };

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Ensure it has { id, role, etc. }
    next();
  } catch (err) {
    console.error("JWT error:", err);
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: Insufficient role" });
    }
    next();
  };
};

module.exports = { verifyToken, authorizeRoles };
