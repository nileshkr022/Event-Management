const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // Array of items since cart can have multiple products from multiple vendors
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },

  // Checkout Details
  shippingDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    number: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: String, required: true }
  },
  paymentMethod: { type: String, enum: ['Cash', 'UPI'], required: true },
  
  status: { type: String, enum: ['Received', 'Ready for Shipping', 'Out For Delivery'], default: 'Received' }

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
