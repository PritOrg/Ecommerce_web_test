const express = require('express');
const router = express.Router();
const Review = require('../models/review.model');

// Get all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one review by ID
router.get('/:id', getReview, (req, res) => {
    res.json(res.review);
});

// Create new review
router.post('/', async (req, res) => {
    const review = new Review({
        user: req.body.user,
        product: req.body.product,
        rating: req.body.rating,
        comment: req.body.comment,
    });
    try {
        const newReview = await review.save();
        res.status(201).json(newReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update one review
router.patch('/:id', getReview, async (req, res) => {
    if (req.body.user != null) {
        res.review.user = req.body.user;
    }
    if (req.body.product != null) {
        res.review.product = req.body.product;
    }
    if (req.body.rating != null) {
        res.review.rating = req.body.rating;
    }
    if (req.body.comment != null) {
        res.review.comment = req.body.comment;
    }
    try {
        const updatedReview = await res.review.save();
        res.json(updatedReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete one review
router.delete('/:id', getReview, async (req, res) => {
    try {
        await res.review.remove();
        res.json({ message: 'Deleted Review' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getReview(req, res, next) {
    let review;
    try {
        review = await Review.findById(req.params.id);
        if (review == null) {
            return res.status(404).json({ message: 'Cannot find review' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.review = review;
    next();
}

module.exports = router;
