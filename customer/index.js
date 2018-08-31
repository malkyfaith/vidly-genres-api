const express = require('express');
const customerRoute = express.Router();

const { Customer, validateCustomer } = require('../models/customer');

customerRoute.get('/', async (req, res) => {
    const customer = await Customer.find({}).sort('name');
    res.send({customer});
})

customerRoute.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.message);

    let customer = new Customer({ name: req.body.name, phone: req.body.phone, isGold: req.body.isGold });
    customer = await customer.save();

    res.send(customer);
});


customerRoute.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
    }
    catch(e) {
        res.status(400).send(e.message);
    }
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    res.send(customer);
});

customerRoute.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});

customerRoute.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id,
        { 
          name: req.body.name,
          isGold: req.body.isGold,
          phone: req.body.phone
        }, { new: true });
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer); 
});


module.exports = { customerRoute };