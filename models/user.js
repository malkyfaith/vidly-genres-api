const mongoose = require('mongoose');
const Joi = require('joi');
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength:255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength:1024
    }
});


function validateUser(user) {
    return Joi.validate(user, {
        name: Joi.string().min(3).max(50),
        email: Joi.string().required().min(3).max(255).email(),
        password: Joi.string().min(3).max(255).required(),
    })
}

const User = mongoose.model('user', UserSchema);

module.exports = { User, validateUser };