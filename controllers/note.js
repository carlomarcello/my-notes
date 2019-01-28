
const Note = require('../models/note.js');
const Category = require('../models/category.js');

exports.getAddNote = (req, res, next) => {

    Category.find()
        .then(categories => {
            res.render('note/add-note', {
                pageTitle: 'Add Note',
                path: '/note/add-note',
                categories: categories,
                editing: false
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postAddNote = (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;

    const note = new Note({
        title: title,
        text: text
    });

    note.save()
        .then(result => {
            console.log(result);
            res.redirect('/note/notes');
        })
        .catch(err => {
            console.log(err);
        });    
};

exports.getNotes = (req, res, next) => {
    Note.find()
        .then(notes => {
            res.render('note/notes', {
                pageTitle: 'All Notes',
                path: '/note/notes',
                notes: notes
            });
        })
        .catch(err => {
            console.log(err);
        });
};
