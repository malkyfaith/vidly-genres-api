const express = require('express');
const movieRoute = express.Router();

const { Movie, validateMovie } = require('../models/movie');
const { Genre } = require('../models/genre')

movieRoute.get('/', async (req, res) => {
    const movie = await Movie.find({})
        .sort('title');
    res.send({ movie });
})

movieRoute.post('/', async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.message);
    // get genre
    let genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(404).send('Genre is not found');
    let movie = new Movie({
        title: req.body.title, numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate, genre: { _id: genre._id, name: genre.name }
    });
    movie = await movie.save();
    res.send(movie);
});


movieRoute.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
    res.send(movie);
});

movieRoute.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');

    res.send(movie);
});

movieRoute.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Movie.findByIdAndUpdate(req.params.id,
        {
            title: req.body.title, numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate, genre: { _id: genre._id, name: genre.name }
        },
        { new: true });
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});


module.exports = { movieRoute };