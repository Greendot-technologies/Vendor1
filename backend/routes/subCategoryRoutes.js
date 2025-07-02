// routes/subcategories.js
const express = require('express');
const router = express.Router();
const controller = require('../controller/subCategoryController');
const { verifyToken, authorizeRoles } = require("../middleware/authmiddleware");
// const { isVendor, isAdmin } = require('../middlewares/auth');

router.post('/request',verifyToken,controller.requestSubCategory);
// router.patch('/approve/:id',controller.approveSubCategory);
router.get('/approved', verifyToken,controller.getApproved);
router.get('/pending-approvals',verifyToken, controller.getPendingApprovals);
router.get('/all-subcategories',verifyToken, controller.getAllSubcategories);

module.exports = router