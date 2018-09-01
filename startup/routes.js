const express = require('express');
const { genresRoute } = require('../genres/');
const { customerRoute } = require('../customer/');
const { movieRoute } = require('../movie/');
const { rentalRoute } = require('../rental/');
const { authRoute } = require('../auth/');
const { usersRoute } = require('../users/');
const error = require('../middleware/error');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/genres', genresRoute);
    app.use('/api/customer', customerRoute);
    app.use('/api/movie', movieRoute);
    app.use('/api/rental', rentalRoute);
    app.use('/api/users', usersRoute);
    app.use('/api/auth', authRoute);
    app.use(error);
}