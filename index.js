
const express = require('express');
const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');
// create app
const app = express();
// logging module
require('./startup/logging')
// db module
require('./startup/db')();
// routes
require('./startup/routes')(app);
// config
require('./startup/config')();

//throw new Error('Error during start up');
Promise.reject('unhandled rejection')

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
