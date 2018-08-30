const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('joi');
const { genreRoutes } = require('./genres/')
// create app
const app = express();

// middleware
app.use(express.json());

const genres = [{
    id: 1,
    name: 'Action'
}, {
    id: 2,
    name: 'Horror'
}, {
    id: 3,
    name: 'Comdey'
}
]

app.get('/api/genres', (req, res) => {
    res.send(genres);
})

app.post('/api/genres', (req, res) => {
    const { error } = validateGenres(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre);
    res.send(genre);
})
//app.use('/api/genres', genreRoutes);

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre not found');
    res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre not found');
    genres.splice(genre, 1);
    res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
