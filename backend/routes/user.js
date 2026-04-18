const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { verifyToken, verifyRole } = require('../middleware/auth');

const router = express.Router();

// Get vendors by category
router.get('/vendors/:category', verifyToken, verifyRole(['user']), async (req, res) => {
  try {
    const vendors = await User.find({ role: 'vendor', category: req.params.category }).select('-password');
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get vendor detail by ID (Public for all logged-in roles)
router.get('/vendors/detail/:vendorId', verifyToken, async (req, res) => {
  try {
    const vendor = await User.findById(req.params.vendorId).select('name category');
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get products by vendor
router.get('/vendors/:vendorId/products', verifyToken, verifyRole(['user']), async (req, res) => {
  try {
    const products = await Product.find({ vendorId: req.params.vendorId });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Place order (Checkout)
router.post('/checkout', verifyToken, verifyRole(['user']), async (req, res) => {
  try {
    const { items, totalAmount, shippingDetails, paymentMethod } = req.body;
    
    // items must be array of objects: { productId, vendorId, quantity, price }
    const order = new Order({
      userId: req.user.id,
      items,
      totalAmount,
      shippingDetails,
      paymentMethod
    });
    
    await order.save();
    res.status(201).json({ message: 'Order placed successfully', orderId: order._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get User's orders (Status)
router.get('/orders', verifyToken, verifyRole(['user']), async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;
