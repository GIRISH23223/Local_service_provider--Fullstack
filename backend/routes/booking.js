const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { protect, provider } = require('../middleware/authMiddleware');

// @desc    Book a service
// @route   POST /api/bookings
// @access  Private (User)
router.post('/', protect, async (req, res) => {
  const { providerId, serviceId, date, purpose } = req.body;

  const booking = new Booking({
    userId: req.user._id,
    providerId,
    serviceId,
    date,
    purpose,
  });

  const createdBooking = await booking.save();
  res.status(201).json(createdBooking);
});

// @desc    Get log-in user's bookings
// @route   GET /api/bookings/mybookings
// @access  Private
router.get('/mybookings', protect, async (req, res) => {
  let bookings;
  if (req.user.role === 'provider') {
    bookings = await Booking.find({ providerId: req.user._id }).populate('userId', 'name email').populate('serviceId');
  } else {
    bookings = await Booking.find({ userId: req.user._id }).populate('providerId', 'name email').populate('serviceId');
  }
  res.json(bookings);
});

// @desc    Update booking status (Accept/Reject)
// @route   PUT /api/bookings/:id
// @access  Private (Provider)
router.put('/:id', protect, provider, async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (booking) {
    if (booking.providerId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    booking.status = req.body.status || booking.status;
    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } else {
    res.status(404).json({ message: 'Booking not found' });
  }
});

module.exports = router;
