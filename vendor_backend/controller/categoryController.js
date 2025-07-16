const pool = require('../config/db'); // your PostgreSQL pool

// GET all categories
exports.getCategories = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM categories ORDER BY sort_order ASC, id ASC`);
    res.status(200).json({ success: true, categories: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch categories", error: error.message });
  }
};