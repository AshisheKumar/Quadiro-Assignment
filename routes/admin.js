const express = require('express');
const router = express.Router();
const Car = require('../models/car');
const User = require('../models/user');

// Middleware to check if admin is logged in
router.use((req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        next();
    } else {
        res.redirect('/admin/login');
    }
});

// Admin Dashboard
router.get('/dashboard', async (req, res) => {
    const cars = await Car.find();
    const carCount = cars.length;
    res.render('admin-dashboard', {
        title: 'Admin Dashboard - Assignment for Quadiro Technologies',
        cars,
        carCount
    });
});

// Create Car
router.post('/car', async (req, res) => {
    const { name, year, price } = req.body;
    const newCar = new Car({ name, year, price });
    await newCar.save();
    res.redirect('/admin/dashboard');
});

// Update Car
router.post('/car/update/:id', async (req, res) => {
    const { id } = req.params;
    const { name, year, price } = req.body;
    await Car.findByIdAndUpdate(id, { name, year, price });
    res.redirect('/admin/dashboard');
});

// Delete Car
router.post('/car/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Car.findByIdAndDelete(id);
    res.redirect('/admin/dashboard');
});

module.exports = router;
