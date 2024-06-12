const express = require('express');
const Review = require('../models/Review');

const router = express.Router();

// Create a new review
router.post('/reviews', async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all reviews
router.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single review by ID
router.get('/reviews/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review) {
      res.status(200).json(review);
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a review
router.put('/reviews/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (review) {
      res.status(200).json(review);
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a review
router.delete('/reviews/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (review) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
