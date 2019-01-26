const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/add-user', adminController.getAddUser);

module.exports = router;
