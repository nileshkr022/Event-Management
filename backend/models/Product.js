const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String } // Storing basic base64 or URL
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
