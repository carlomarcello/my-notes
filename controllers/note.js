
const Note = require('../models/note.js');

exports.getAddNote = (req, res, next) => {
    res.render('note/add-note', {
		pageTitle: 'Add Note',
		path: '/note/add-note',
		editing: false
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
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
    
    // res.render('note/add-note', {
	// 	pageTitle: 'Add Note',
	// 	path: '/note/add-note',
	// 	editing: false
	// });
};

exports.getNotes = (req, res, next) => {

};
