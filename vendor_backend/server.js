const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Load environment variables
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

// Request logging middleware for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// CORS configuration
const allowedOrigins = [
  "https://vendor-project.netlify.app",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:3001",

];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Static file serving for uploaded images
app.use("/uploads", express.static(path.join(__dirname, "Uploads")));

// Route Imports
const authRoutes = require("./routes/authRoutes");
const subCategoryRoutes = require("./routes/subCategoryRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const vendorDashboardRoutes = require("./routes/vendorDashboardRoutes");
const vendorLocationRoutes = require("./routes/vendorLocationRoutes");
const authServiceRoutes = require('./routes/authServiceRoutes');
// API Routes
app.use("/api/user", authRoutes); // Login/register
app.use("/api/user", subCategoryRoutes); // Subcategory under user
app.use("/api/products", productRoutes); // Product-related
app.use("/api/category", categoryRoutes); // Category-related
app.use("/api/vendor", vendorDashboardRoutes);
app.use("/api/vendor-locations", vendorLocationRoutes);
app.use('/api', authServiceRoutes);
// Fallback route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
