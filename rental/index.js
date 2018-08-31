const express = require('express');
const rentalRoute = express.Router();
const Fawn = require('fawn');
const mongoose = require('mongoose');
const { Rental, validateRental } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');

Fawn.init(mongoose)

rentalRoute.get('/', async (req, res) => {
    const rental = await Rental.find({}).sort('-dateOut');
    res.send(rental);
})

rentalRoute.post('/', async (req, res) => {
    const { error } = validateRental(req.body);
    if (error) return res.status(400).send(error.message);

    let customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(404).send('Customer is not found');

    let movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(404).send('Movie is not found');

    if (movie.numberInStock === 0) return res.status(400).send("Movie not in stock");

    let rental = new Rental({
        customer: { _id: customer._id, name: customer.name, phone: customer.phone },
        movie: { _id: customer._id, title: movie.title, dailyRentalRate: movie.dailyRentalRate },
    });
    // rental = await rental.save();
    // movie.numberInStock--;
    // await movie.save()
    // res.send(rental);

    // save the above operation as a single unit - transaction
    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, { $inc: { numberInStock: -1 } })
            .run();
        res.send(rental);
    } catch (e) {
        console.log(e);
        
        res.status(500).send('Something failed', e); 
    }
})


// rentalRoute.get('/:id', async (req, res) => {
//     const genre = await Genre.findById(req.params.id);
//     if (!genre) return res.status(404).send('The genre with the given ID was not found.');
//     res.send(genre);
// });

// rentalRoute.delete('/:id', async (req, res) => {
//     const deletedGenre = await Genre.findByIdAndRemove(req.params.id);
//     if (!deletedGenre) return res.status(404).send('The genre with the given ID was not found.');

//     res.send(deletedGenre);
// });

// rentalRoute.put('/:id', async (req, res) => {
//     const { error } = validateGenres(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true});
//     if (!genre) return res.status(404).send('The genre with the given ID was not found.');

//     res.send(genre); 
// });

module.exports = { rentalRoute };