// app/controllers/userController.js

const bcrypt = require('bcryptjs');

const User = require('../models/user'); // assuming you have a user model set up with Sequelize

// Register a new user
exports.register = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 8);
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Login user
exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: 'Invalid credentials' });
        }
        // Here you should create a session or token to keep the user logged in
        res.send({ message: 'User logged in successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};

// Logout user
exports.logout = (req, res) => {
    // Here you should destroy the session or token to log the user out
    res.send({ message: 'User logged out successfully' });
};

// Ensure authentication middleware
// Ensure authentication middleware
exports.ensureAuthenticated = (req, res, next) => {
    // Temporarily allow all requests. Replace with actual authentication logic.
    return next();
};


// Placeholder for profile methods
exports.getProfile = (req, res) => { /* ... */ };
exports.updateProfile = (req, res) => { /* ... */ };
exports.deleteProfile = (req, res) => { /* ... */ };
