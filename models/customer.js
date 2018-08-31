const mongoose = require('mongoose');
const Joi = require('joi');

const CustomerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
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
});

const Customer = mongoose.model('customer', CustomerSchema);

function validateCustomer(customer) {
    return Joi.validate(customer, {
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(3).required(),
        isGold: Joi.boolean()
    })
}


module.exports = { Customer, validateCustomer };