const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const { protect, provider } = require('../middleware/authMiddleware');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
router.get('/', async (req, res) => {
  const services = await Service.find({}).populate('providerId', 'name email');
  res.json(services);
});

// @desc    Get single service by ID
// @route   GET /api/services/:id
// @access  Public
router.get('/:id', async (req, res) => {
  const service = await Service.findById(req.params.id).populate('providerId', 'name email');
  if (service) {
    res.json(service);
  } else {
    res.status(404).json({ message: 'Service not found' });
  }
});

// @desc    Create a new service
// @route   POST /api/services
// @access  Private/Provider
router.post('/', protect, provider, async (req, res) => {
  const { serviceName, category, description, price, location } = req.body;

  const service = new Service({
    providerId: req.user._id,
    serviceName,
    category,
    description,
    price,
    location,
  });

  const createdService = await service.save();
  res.status(201).json(createdService);
});

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private/Provider
router.delete('/:id', protect, provider, async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (service) {
    if (service.providerId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this service' });
    }
    await Service.deleteOne({ _id: req.params.id });
    res.json({ message: 'Service removed' });
  } else {
    res.status(404).json({ message: 'Service not found' });
  }
});

module.exports = router;
