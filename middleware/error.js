const winston = require('winston');

module.exports = function (err, req, res, next) {
    winston.log('error', err.message, err);

    //error
    //warn
    //info
    //verbose
    //debug
    //silly

    // log the error
    res.status(500).send('Something wrong')
}