


const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
// Express middleware
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'https://vendor-project.netlify.app',
        'http://localhost:3000',
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
// Route Imports
const authRoutes = require("./routes/authRoutes");

const subCategoryRoutes = require("./routes/subCategoryRoutes");
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');


// API Routes
app.use("/api/user", authRoutes);
app.use("/api/user", subCategoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/category', categoryRoutes);


// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Fallback route for undefined paths
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
