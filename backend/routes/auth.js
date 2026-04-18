const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/signup/user', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role: 'user' });
    
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/signup/vendor', async (req, res) => {
  try {
    const { name, email, password, category } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newVendor = new User({ 
      name, email, password: hashedPassword, role: 'vendor', category 
    });
    
    await newVendor.save();
    res.status(201).json({ message: 'Vendor registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // First setup check: Admin login
    let user = await User.findOne({ email });
    
    if (!user && email === 'admin' && password === 'admin') {
       // Auto-create admin if logs in with admin/admin for the first time
       const hashedAdminPassword = await bcrypt.hash('admin', 10);
       user = new User({ name: 'Admin', email: 'admin', password: hashedAdminPassword, role: 'admin' });
       await user.save();
    } else if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

    const payload = { id: user._id, role: user.role, name: user.name };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user: payload });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to verify session token and get user context on page reload
router.get('/me', require('../middleware/auth').verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
});

module.exports = router;
