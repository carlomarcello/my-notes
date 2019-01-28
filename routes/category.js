const path = require('path');

const express = require('express');

const noteController = require('../controllers/category');

const router = express.Router();

router.get('/add-category', noteController.getAddCategory);

router.post('/add-category', noteController.postAddCategory);

router.get('/categories', noteController.getCategories);

module.exports = router;
