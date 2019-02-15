const path = require('path');

const express = require('express');

const noteController = require('../controllers/note');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// Root = /note/
router.get('/add-note', isAuth, noteController.getAddNote);

router.post('/add-note', isAuth, noteController.postAddNote);

router.get('/notes', isAuth, noteController.getNotes);

router.get('/edit-note/:noteId', isAuth, noteController.getNote);

module.exports = router;
