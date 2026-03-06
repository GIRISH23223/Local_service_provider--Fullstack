const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const { protect } = require('../middleware/authMiddleware');

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private (User)
router.post('/', protect, async (req, res) => {
  const { providerId, rating, comment } = req.body;

  const review = new Review({
    userId: req.user._id,
    providerId,
    rating,
    comment,
  });

  const createdReview = await review.save();
  res.status(201).json(createdReview);
});

// @desc    Get reviews for a provider
// @route   GET /api/reviews/:providerId
// @access  Public
router.get('/:providerId', async (req, res) => {
  const reviews = await Review.find({ providerId: req.params.providerId }).populate('userId', 'name');
  res.json(reviews);
});

module.exports = router;
