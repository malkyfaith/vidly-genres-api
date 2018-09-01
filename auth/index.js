const express = require('express');
const authRoute = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const config = require('config');
const Joi = require('joi');
const { User } = require('../models/user');


authRoute.post('/', async (req, res) => {
    // validate the request
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send("Invalid email or password");

    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) return res.status(404).send("Invalid password");

    const token = user.generateAuthToken()
    
    res.send(token);
});

function validate(req) {
    return Joi.validate(req, {
        email: Joi.string().required().min(3).max(255).email(),
        password: Joi.string().min(3).max(255).required()
    });
}


module.exports = { authRoute };