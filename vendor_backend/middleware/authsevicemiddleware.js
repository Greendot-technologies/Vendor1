const jwt = require('jsonwebtoken');
const pool = require('../config/db');
require('dotenv').config();

// ✅ Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token required' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.user = user; // Attach decoded user info to request
    next();
  });
};

// ✅ Middleware to check specific permission
const checkPermission = (key) => {
  return async (req, res, next) => {
    const vendorId = req.user.id;

    try {
      const result = await pool.query(
        'SELECT permissions FROM vendor_permissions WHERE vendor_id = $1',
        [vendorId]
      );

      const permissions = result.rows[0]?.permissions || {};

      if (permissions[key]) {
        next();
      } else {
        res.status(403).json({ message: `You don't have access to ${key}` });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Permission check failed' });
    }
  };
};

// ✅ Export both middlewares
module.exports = {
  authenticateToken,
  checkPermission
};
