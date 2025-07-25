const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  verifyOTP,
  logoutUser,
  getMyPermissions
} = require('../controller/authServiceController');

const {
  authenticateToken,
  checkPermission
} = require('../middleware/authsevicemiddleware');

// ✅ Register Route
router.post('/register', registerUser);

// ✅ Login Route
router.post('/login', loginUser);
router.post("/verify-otp", verifyOTP);
router.post('/logout',  logoutUser);
// ✅ Get User Permissions (JWT Protected)
router.get('/permissions', authenticateToken, getMyPermissions);

// ✅ Example Protected Route (check if user has 'drone_service' permission)
router.get(
  '/drone-service/dashboard',
  authenticateToken,
  checkPermission('drone_service'),
  (req, res) => {
    res.json({ message: 'Welcome to Drone Service Dashboard' });
  }
);

// ✅ Another example for 'crop_insurance'
router.get(
  '/crop-insurance/dashboard',
  authenticateToken,
  checkPermission('crop_insurance'),
  (req, res) => {
    res.json({ message: 'Welcome to Crop Insurance Dashboard' });
  }
);

module.exports = router;
