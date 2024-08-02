const express = require('express');
const router = express.Router();
const Car = require('../models/car');

// Middleware to check if user is logged in
router.use((req, res, next) => {
    if (req.session.user && req.session.user.role === 'user') {
        next();
    } else {
        res.redirect('/user/login');
    }
});

// User View Cars
router.get('/cars', async (req, res) => {
    const cars = await Car.find();
    res.render('user-cars', {
        title: 'Cars - Assignment for Quadiro Technologies',
        cars
    });
});

module.exports = router;
