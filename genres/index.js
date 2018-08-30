const express = require('express');
const genreRoutes = express.Router();
const { Genre } = require('../models/genre');
// genreRoutes.get('/', (req, res) => {
//     const genres = await Genre.find();
//     res.send(genres);
// });

// genreRoutes.post('/', (req, res) => {
//     console.log(req.body);
//     const genre = new Genre(req.body);
//     const genres = await save.save();
//     res.send(genres);
// });



module.exports = { genreRoutes };