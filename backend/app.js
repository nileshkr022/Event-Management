const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Routes
const userRoutes = require("./routes/users");
const vendorRoutes = require("./routes/vendors");
const adminRoutes = require("./routes/admin");
const cartRoutes = require("./routes/cart");

// Config
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// CORS (important for MERN)
app.use(cors({
  origin: "http://localhost:5173", // Vite default port
  credentials: true
}));

// Database Connection
const connectDB = require("./config/db");
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cart", cartRoutes);

// Test Route (optional but useful)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message || "Something went wrong!",
  });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});