const mongoose = require('mongoose');
const Joi = require('joi');
const RentalSchema = mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 50
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                trim: true,
                required: true,
                minlength: 1,
                maxlength: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required:true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rental: {
        type: Number,
        min: 0
    }
});

const Rental = mongoose.model('rental', RentalSchema);

function validateRental(rental) {
    return Joi.validate(rental, {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    })
}


module.exports = { Rental, validateRental };