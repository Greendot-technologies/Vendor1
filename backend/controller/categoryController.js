const pool = require('../config/db'); // your PostgreSQL pool

// exports.getAllCategories = async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM categories ORDER BY sort_order ASC, id ASC');
//     res.json({ categories: result.rows });
//   } catch (err) {
//     console.error('Error fetching categories:', err.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

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