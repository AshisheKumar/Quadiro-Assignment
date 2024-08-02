const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Home Route
router.get('/', (req, res) => {
    res.render('index', { title: 'Assignment for Quadiro Technologies' });
});

// Admin Login Route
router.get('/admin/login', (req, res) => {
    res.render('admin-login', { title: 'Admin Login - Assignment for Quadiro Technologies' });
});

router.post('/admin/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, role: 'admin' });
    if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.redirect('/admin/dashboard');
    } else {
        res.redirect('/admin/login');
    }
});

// Admin Register Route
router.get('/admin/register', (req, res) => {
    res.render('admin-register', { title: 'Admin Register - Assignment for Quadiro Technologies' });
});

router.post('/admin/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('Admin already exists');
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Create a new admin user
        const newUser = new User({ username, password: hashedPassword, role: 'admin' });
        await newUser.save();

        res.redirect('/admin/login');
    } catch (error) {
        console.error('Error during admin registration:', error);
        res.status(500).send('Internal server error');
    }
});

// User Login Route
router.get('/user/login', (req, res) => {
    res.render('user-login', { title: 'User Login - Assignment for Quadiro Technologies' });
});

router.post('/user/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, role: 'user' });
    if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.redirect('/user/cars');
    } else {
        res.redirect('/user/login');
    }
});

// User Register Route
router.get('/user/register', (req, res) => {
    res.render('user-register', { title: 'User Register - Assignment for Quadiro Technologies' });
});

router.post('/user/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Create a new user
        const newUser = new User({ username, password: hashedPassword, role: 'user' });
        await newUser.save();

        res.redirect('/user/login');
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
