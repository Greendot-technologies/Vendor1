// const express = require("express");
// const dotenv = require("dotenv");
// const authRoutes = require("./routes/authRoutes");
// // const flightRoutes = require("./routes/flightRoutes");
// // const masterDataRoutes = require("./routes/masterDataRoutes");
// const path = require("path");
// const cors = require("cors");

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use("/api/user", authRoutes);
// // app.use("/api", flightRoutes);
// // app.use("/api/user", masterDataRoutes);
// // app.use(express.static(path.join(__dirname, "public")));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });





// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const path = require("path");

// // Load environment variables
// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Route Imports
// const authRoutes = require("./routes/authRoutes");

// const subCategoryRoutes = require("./routes/subCategoryRoutes");


// // API Routes
// app.use("/api/user", authRoutes);
// app.use("/api/user", subCategoryRoutes);


// // Static files (optional, if you have a frontend build folder)
// app.use(express.static(path.join(__dirname, "public")));

// // Fallback route for undefined paths
// app.use((req, res) => {
//   res.status(404).json({ error: "Route not found" });
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
// });





const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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
