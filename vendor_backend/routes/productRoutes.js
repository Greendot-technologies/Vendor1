const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const productController = require("../controller/productController");
const { verifyToken, authorizeRoles } = require("../middleware/authmiddleware");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage });

// add product route //
router.post("/add", upload.array("images", 5),verifyToken,authorizeRoles("vendor", "company"), productController.addProduct);

// add get all route //
router.get("/all", productController.getAllProducts);

// update product route //
router.put("/update/:id", upload.array("images" ,5), verifyToken,productController.updateProduct);

// delete product route //
router.delete("/delete/:id",verifyToken, productController.deleteProduct);

// get product images route //
router.get("/images/:id", productController.getProductImages);

// routes/product.js
router.get('/vendor/products', verifyToken, authorizeRoles("vendor","company"), productController.getMyProducts);

// GET /api/vendor/profile
router.get('/profile', verifyToken, authorizeRoles("vendor","company"), productController.getProfile);

module.exports = router;