const express = require('express');
const router = express.Router();
const categoriesController = require('../controller/categoryController');

router.get('/categories', categoriesController.getAllCategories);

module.exports = router;