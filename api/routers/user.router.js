const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get user by ID
router.get('/:id', getUser, (req, res) => {
    res.json(res.user);
});

// Create new user
router.post('/', async (req, res) => {
    try {
        const user = new User({
            firstName: req.body.firstName,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            lastName: req.body.lastName,
            dateOfBirth: req.body.dateOfBirth,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
        });

        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Update user by ID
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.username != null) {
        res.user.username = req.body.username;
    }
    if (req.body.email != null) {
        res.user.email = req.body.email;
    }
    if (req.body.password != null) {
        res.user.password = req.body.password;
    }
    if (req.body.firstName != null) {
        res.user.firstName = req.body.firstName;
    }
    if (req.body.lastName != null) {
        res.user.lastName = req.body.lastName;
    }
    if (req.body.dateOfBirth != null) {
        res.user.dateOfBirth = req.body.dateOfBirth;
    }
    if (req.body.phoneNumber != null) {
        res.user.phoneNumber = req.body.phoneNumber;
    }
    if (req.body.address != null) {
        res.user.address = req.body.address;
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete user by ID
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.user = user;
    next();
}

module.exports = router;
