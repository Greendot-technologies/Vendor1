
const express = require('express');
const { verifyToken, authorizeRoles } = require('../middleware/authmiddleware');
const vendorDashboardController = require('../controller/vendorDashboardController');

const router = express.Router();

router.get(
  '/locations',
  verifyToken,
  authorizeRoles('vendor', 'company', 'service'),
  vendorDashboardController.getAllLocations
);

router.put(
  '/pincodes/:pincode_id/enable',
  verifyToken,
  authorizeRoles('vendor', 'company', 'service'),
  vendorDashboardController.enablePincode
);

router.put(
  '/pincodes/:pincode_id/disable',
  verifyToken,
  authorizeRoles('vendor', 'company', 'service'),
  vendorDashboardController.disablePincode
);

module.exports = router;
