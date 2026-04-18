const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const vendorRoutes = require('./routes/vendor');
const userRoutes = require('./routes/user');

const app = express();

app.use(cors());
app.use(express.json());

// Handle MongoDB connection - using a function to ensure it's established before API processing
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware to ensure DB connection


app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/user', userRoutes);

// Mount duplicate routes without '/api' for Vercel's routePrefix stripping
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/vendor', vendorRoutes);
app.use('/user', userRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// For local development - use a check to avoid running in Serverless environments
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

module.exports = app;
