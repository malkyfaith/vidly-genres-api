const express = require('express');
const genresRoute = express.Router();
const Joi = require('joi');
const { Genre } = require('../models/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');


genresRoute.get('/', async (req, res) => {
    const genres = await Genre.find({}).sort('name');
    res.send(genres);
});

genresRoute.post('/', auth, async (req, res) => {
    const { error } = validateGenres(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();

    res.send(genre);
})


genresRoute.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
});

genresRoute.delete('/:id', [auth, admin], async (req, res) => {
    const deletedGenre = await Genre.findByIdAndRemove(req.params.id);
    if (!deletedGenre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(deletedGenre);
});

genresRoute.put('/:id', async (req, res) => {
    const { error } = validateGenres(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
});

function validateGenres(genre) {
    return Joi.validate(genre, {
        name: Joi.string().min(3).required()
    })
}

module.exports = { genresRoute };