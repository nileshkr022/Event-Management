const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'vendor', 'user'], required: true },
  
  // Vendor specific
  category: { type: String, enum: ['Catering', 'Florist', 'Decoration', 'Lighting', null], default: null },
  contactDetails: { type: String }, // For Vendor Page
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
