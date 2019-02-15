const path = require('path');

const express = require('express');

const noteController = require('../controllers/category');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/add-category', isAuth, noteController.getAddCategory);

router.post('/add-category', isAuth, noteController.postAddCategory);

router.get('/categories', isAuth, noteController.getCategories);

module.exports = router;
