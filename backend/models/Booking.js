const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    providerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    serviceId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Service' },
    date: { type: Date, required: true },
    purpose: { type: String, required: true },
    status: { type: String, required: true, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  },
  { timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
