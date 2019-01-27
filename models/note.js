const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Note', noteSchema);