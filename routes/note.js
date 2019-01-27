const path = require('path');

const express = require('express');

const noteController = require('../controllers/note');

const router = express.Router();

router.get('/add-note', noteController.getAddNote);

router.post('/add-note', noteController.postAddNote);

router.get('/notes', noteController.getNotes);

module.exports = router;
