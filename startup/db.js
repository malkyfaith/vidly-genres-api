const mongoose = require('mongoose');
const winston = require('winston');
module.exports = function () {
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vidly')
        .then(() => winston.info('Connected to MongoDB...'));
}