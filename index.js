const express = require('express');
const bodyParser = require('body-parser');
require('./db/db');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { genresRoute } = require('./genres/');
const { customerRoute } = require('./customer/');
const { movieRoute } = require('./movie/');
const { rentalRoute } = require('./rental/');
// create app
const app = express();

// middleware
app.use(express.json());

app.use('/api/genres', genresRoute);
app.use('/api/customer', customerRoute);
app.use('/api/movie', movieRoute);
app.use('/api/rental', rentalRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
