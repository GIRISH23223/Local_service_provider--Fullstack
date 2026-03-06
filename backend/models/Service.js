const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema(
  {
    providerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    serviceName: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true }
);

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
