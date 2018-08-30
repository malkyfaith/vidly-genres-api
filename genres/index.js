const express = require('express');
const genresRoute = express.Router();
const Joi = require('joi');
const { Genre } = require('../models/genre');

const genres = [{ id: 1, name: 'Action' }, { id: 2, name: 'Horror' }, { id: 3, name: 'Comdey' }];
genresRoute.get('/', (req, res) => {
    res.send(genres);
})

genresRoute.post('/', (req, res) => {
    const { error } = validateGenres(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre);
    res.send(genre);
})


genresRoute.get('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre not found');
    res.send(genre);
});

genresRoute.delete('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre not found');
    genres.splice(genre, 1);
    res.send(genre);
});

genresRoute.put('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre not found');

    const { error } = validateGenres(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
});

function validateGenres(genre) {
    return Joi.validate(genre, {
        name: Joi.string().min(3).required()
    })
}



module.exports = { genresRoute };