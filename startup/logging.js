const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');
module.exports = function () {
    // winston.exceptions.handle(
    //     new winston.transports.Console({ colorize: true, prettyPrint: true })
    // )

    process.on('uncaughtException', (ex) => {
        console.log('uncaughtException-----');
        
        winston.error(ex.message, ex);
        process.exit(1);
    });

    process.on('unhandledRejection', (ex) => {
        console.log('We got an UNHANLDED Rejection', ex);
        winston.error(ex.message, ex);
        //throw ex;
        // winston.error(ex.message, ex);
        // process.exit(1);
    });
    winston.add(new winston.transports.File({ filename: "../logfile.log" }));
    winston.add(new winston.transports.MongoDB({
        db: "mongodb://localhost:27017/vidly",
        tryReconnect: true
    }));
}