const express = require('express');
const User = require('../models/User');
const Membership = require('../models/Membership');
const { verifyToken, verifyRole } = require('../middleware/auth');
const bcrypt = require('bcryptjs');

const router = express.Router();

// Get all users
router.get('/users', verifyToken, verifyRole(['admin']), async (req, res) => {
    try {
        const users = await User.find({ role: 'user' }).select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update user
router.put('/users/:id', verifyToken, verifyRole(['admin']), async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete user
router.delete('/users/:id', verifyToken, verifyRole(['admin']), async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all vendors
router.get('/vendors', verifyToken, verifyRole(['admin']), async (req, res) => {
    try {
        const vendors = await User.find({ role: 'vendor' }).select('-password');
        res.json(vendors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get memberships
router.get('/memberships', verifyToken, verifyRole(['admin']), async (req, res) => {
    try {
        const memberships = await Membership.find().populate('vendorId', 'name email');
        res.json(memberships);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add Membership
router.post('/memberships', verifyToken, verifyRole(['admin']), async (req, res) => {
    try {
        const { vendorId, duration } = req.body;
        
        let months = 6;
        if(duration === '1 year') months = 12;
        if(duration === '2 years') months = 24;

        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + months);

        const newMembership = new Membership({
            vendorId,
            duration,
            endDate
        });

        await newMembership.save();
        res.status(201).json(newMembership);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update Membership (Extend/Cancel)
router.put('/memberships/:id', verifyToken, verifyRole(['admin']), async (req, res) => {
    try {
        const { action, duration } = req.body; 
        const membership = await Membership.findById(req.params.id);
        
        if(!membership) return res.status(404).json({ message: 'Membership not found' });

        if(action === 'Cancel') {
            membership.status = 'Cancelled';
        } else if (action === 'Extend') {
            let months = 6;
            if(duration === '1 year') months = 12;
            if(duration === '2 years') months = 24;
            
            const newEndDate = new Date(membership.endDate);
            newEndDate.setMonth(newEndDate.getMonth() + months);
            membership.endDate = newEndDate;
            membership.duration = duration || membership.duration;
            membership.status = 'Active'; // Re-activate if was cancelled
        }

        await membership.save();
        res.json(membership);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Change Admin Password
router.put('/change-password', verifyToken, verifyRole(['admin']), async (req, res) => {
    try {
        const { newPassword } = req.body;
        if (!newPassword || newPassword.length < 5) {
            return res.status(400).json({ message: 'Password must be at least 5 characters long' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(req.user.id, { password: hashedPassword });
        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
