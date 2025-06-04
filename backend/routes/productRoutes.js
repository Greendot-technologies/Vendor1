const express = require('express');
const router = express.Router();

const productController = require('../controller/productController');
const { verifyToken } = require('../middleware/authmiddleware');
const upload = require('../middleware/upload');

// --------------------- Product Routes ---------------------

// Add product (vendor/company)
router.post(
  '/',
  verifyToken,
  upload.array('images', 10), // Upload up to 10 images
  productController.addProduct
);

// Update product by ID
router.put(
  '/:id',
  verifyToken,
  upload.array('images', 10),
  productController.updateProduct
);

// Delete product by ID
router.delete('/:id', verifyToken, productController.deleteProduct);

// Get all products (with optional filters)
router.get('/', productController.getProducts);

// Get grouped products by category
router.get('/grouped-by-category', productController.getProductsGroupedByCategory);

// Get a single product by ID (optional but useful)
// router.get('/:id', productController.getProductById);  // Uncomment if needed

// ----------------------------------------------------------

module.exports = router;
