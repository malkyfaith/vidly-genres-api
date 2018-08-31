const mongoose = require('mongoose');
const Joi = require('joi');
const { GenreSchema } = require('./genre');

const MovieSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    numberInStock: {
        type: Number,
        default: 0,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    genre: {
        type: GenreSchema, // sub document or embedded document
        required: true
    }
});

const Movie = mongoose.model('movie', MovieSchema);

function validateMovie(movie) {
    return Joi.validate(movie, {
        title: Joi.string().min(1).required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required(),
        genreId: Joi.objectId().required()
    })
}


module.exports = { Movie, validateMovie };