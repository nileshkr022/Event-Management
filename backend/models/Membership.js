const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  duration: { type: String, enum: ['6 months', '1 year', '2 years'], default: '6 months', required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['Active', 'Cancelled'], default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('Membership', membershipSchema);
