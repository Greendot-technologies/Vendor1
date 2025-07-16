
const express = require("express");
const router = express.Router();

const { upload, processUploads } = require("../middleware/uploadImage"); // ✅ multer + S3 logic
const productController = require("../controller/productController");
const { verifyToken, authorizeRoles } = require("../middleware/authmiddleware");

// ✅ Add new product (with S3 image upload)
router.post(
  "/add",
  verifyToken,
  authorizeRoles("vendor", "company"),
  upload.array("images", 5),    // Step 1: multer parses files
  processUploads,               // Step 2: upload to S3, set req.s3ImageUrls[]
  productController.addProduct  // Step 3: Save product + image URLs to DB
);

// ✅ Get all products
router.get("/all", productController.getAllProducts);

// ✅ Update product
router.put(
  "/update/:id",
  verifyToken,
  authorizeRoles("vendor", "company"),
  upload.array("images", 5),    // allow re-uploading images
  processUploads,
  productController.updateProduct
);

// ✅ Delete product
router.delete(
  "/delete/:id",
  verifyToken,
  authorizeRoles("vendor", "company"),
  productController.deleteProduct
);

// ✅ Get product images (if needed)
router.get("/images/:id", productController.getProductImages);

// ✅ Get all products added by this vendor/company
router.get(
  "/vendor/products",
  verifyToken,
  authorizeRoles("vendor", "company"),
  productController.getMyProducts
);

// ✅ Get vendor/company profile
router.get(
  "/profile",
  verifyToken,
  authorizeRoles("vendor", "company"),
  productController.getProfile
);

module.exports = router;
