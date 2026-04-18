const express = require('express');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { verifyToken, verifyRole } = require('../middleware/auth');

const router = express.Router();

// Get all products for logged-in vendor
router.get('/products', verifyToken, verifyRole(['vendor']), async (req, res) => {
  try {
    const products = await Product.find({ vendorId: req.user.id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new product
router.post('/products', verifyToken, verifyRole(['vendor']), async (req, res) => {
  try {
    const { name, price, image } = req.body;

    const newProduct = new Product({
      vendorId: req.user.id,
      name,
      price,
      image
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update product
router.put('/products/:id', verifyToken, verifyRole(['vendor']), async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      {
        _id: req.params.id,
        vendorId: req.user.id
      },
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found or unauthorized" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete product
router.delete('/products/:id', verifyToken, verifyRole(['vendor']), async (req, res) => {
  try {
    const result = await Product.findOneAndDelete({
      _id: req.params.id,
      vendorId: req.user.id
    });

    if (!result) {
      return res.status(404).json({ message: "Product not found or unauthorized" });
    }

    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get vendor orders
router.get('/orders', verifyToken, verifyRole(['vendor']), async (req, res) => {
  try {
    const orders = await Order.find({ "items.vendorId": req.user.id })
      .populate('items.productId')
      .populate('userId', 'name email');

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status
router.put('/orders/:id/status', verifyToken, verifyRole(['vendor']), async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;