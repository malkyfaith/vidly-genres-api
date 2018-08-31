const mongoose = require('mongoose');

const GenreSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    }
});

const Genre = mongoose.model('genre', GenreSchema);

module.exports = { Genre, GenreSchema };