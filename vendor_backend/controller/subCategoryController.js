// controllers/subcategoriesController.js
const pool = require('../config/db');


exports.requestSubCategory = async (req, res) => {
  const { category_id, name_en, slug, description } = req.body;
  const vendor_id = req.user.id;

  try {
    // Ensure the category exists
    const categoryCheck = await pool.query(
      `SELECT id FROM categories WHERE id = $1 AND is_active = true`,
      [category_id]
    );

    if (categoryCheck.rowCount === 0) {
      return res.status(400).json({ message: 'Invalid or inactive category_id' });
    }

    // Insert subcategory request
    const result = await pool.query(
      `INSERT INTO sub_categories (
        category_id, name_en, slug, description,
        is_active, created_at, vendor_id, approved_by_admin
      ) VALUES ($1, $2, $3, $4, false, NOW(), $5, false)
      RETURNING *`,
      [category_id, name_en, slug, description, vendor_id]
    );

    res.status(201).json({
      message: 'Request sent to admin',
      subcategory: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error adding subcategory',
      error: err.message,
    });
  }
};


// exports.getApproved = async (req, res) => {
//   try {
//     const result = await pool.query(
//       `SELECT * FROM sub_categories WHERE is_active = true AND approved_by_admin = true`
//     );

//     res.json(result.rows);
//   } catch (err) {
//     res.status(500).json({
//       message: 'Error fetching subcategories',
//       error: err.message,
//     });
//   }
// };





// exports.getPendingApprovals = async (req, res) => {
//   try {
//     const result = await pool.query(
//       `SELECT * FROM sub_categories WHERE approved_by_admin = false`
//     );

//     res.status(200).json({
//       message: 'Pending approval subcategories fetched successfully',
//       subcategories: result.rows,
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: 'Error fetching pending approvals',
//       error: err.message,
//     });
//   }
// };



// exports.getAllSubcategories = async (req, res) => {
//   try {
//     // Fetch pending subcategories (not yet approved)
//     const pendingResult = await pool.query(
//       `SELECT s.id, s.name_en AS name, c.name_en AS category_name, 
//               'pending' AS status
//        FROM sub_categories s
//        JOIN categories c ON s.category_id = c.id
//        WHERE s.approved_by_admin = false
//        ORDER BY s.id DESC`
//     );

//     // Fetch approved subcategories
//     const approvedResult = await pool.query(
//       `SELECT s.id, s.name_en AS name, c.name_en AS category_name, 
//               'approved' AS status
//        FROM sub_categories s
//        JOIN categories c ON s.category_id = c.id
//        WHERE s.approved_by_admin = true
//        ORDER BY s.id DESC`
//     );

//     res.status(200).json({
//       message: 'Subcategories fetched successfully',
//       pending: pendingResult.rows,
//       approved: approvedResult.rows,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       message: 'Error fetching subcategories',
//       error: err.message,
//     });
//   }
// };


// exports.getApproved = async (req, res) => {
//   try {
//     const result = await pool.query(
//       `SELECT s.id, s.name_en, s.slug, s.description, c.name_en AS category_name,
//               s.remark,
//               CASE
//                 WHEN s.approved_by_admin = true THEN 'approved'
//                 WHEN s.approved_by_admin = false AND s.remark IS NOT NULL THEN 'rejected'
//                 ELSE 'pending'
//               END AS status
//        FROM sub_categories s
//        JOIN categories c ON s.category_id = c.id
//        WHERE s.is_active = true AND s.approved_by_admin = true
//        ORDER BY s.id DESC`
//     );

//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       message: 'Error fetching approved subcategories',
//       error: err.message,
//     });
//   }
// };


exports.getApproved = async (req, res) => {
  const vendor_id = req.user.id;

  try {
    const result = await pool.query(
      `SELECT s.id, s.name_en, s.slug, s.description, c.name_en AS category_name,
              s.remark,
              CASE
                WHEN s.approved_by_admin = true THEN 'approved'
                WHEN s.approved_by_admin = false AND s.remark IS NOT NULL THEN 'rejected'
                ELSE 'pending'
              END AS status
       FROM sub_categories s
       JOIN categories c ON s.category_id = c.id
       WHERE s.is_active = true AND s.approved_by_admin = true
         AND s.vendor_id = $1
       ORDER BY s.id DESC`,
      [vendor_id]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error fetching approved subcategories',
      error: err.message,
    });
  }
};


// exports.getPendingApprovals = async (req, res) => {
//   try {
//     const result = await pool.query(
//       `SELECT s.id, s.name_en, s.slug, s.description, c.name_en AS category_name,
//               s.remark,
//               CASE
//                 WHEN s.approved_by_admin = false AND s.remark IS NOT NULL THEN 'rejected'
//                 ELSE 'pending'
//               END AS status
//        FROM sub_categories s
//        JOIN categories c ON s.category_id = c.id
//        WHERE s.approved_by_admin = false
//        ORDER BY s.id DESC`
//     );

//     res.status(200).json({
//       message: 'Pending approval subcategories fetched successfully',
//       subcategories: result.rows,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       message: 'Error fetching pending approvals',
//       error: err.message,
//     });
//   }
// };

exports.getPendingApprovals = async (req, res) => {
  const vendor_id = req.user.id;

  try {
    const result = await pool.query(
      `SELECT s.id, s.name_en, s.slug, s.description, c.name_en AS category_name,
              s.remark,
              CASE
                WHEN s.approved_by_admin = false AND s.remark IS NOT NULL THEN 'rejected'
                ELSE 'pending'
              END AS status
       FROM sub_categories s
       JOIN categories c ON s.category_id = c.id
       WHERE s.approved_by_admin = false
         AND s.vendor_id = $1
       ORDER BY s.id DESC`,
      [vendor_id]
    );

    res.status(200).json({
      message: 'Pending approval subcategories fetched successfully',
      subcategories: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error fetching pending approvals',
      error: err.message,
    });
  }
};


// exports.getAllSubcategories = async (req, res) => {
//   try {
//     const result = await pool.query(
//       `SELECT s.id, s.name_en, s.slug, s.description, c.name_en AS category_name,
//               s.remark,
//               CASE
//                 WHEN s.approved_by_admin = true THEN 'approved'
//                 WHEN s.approved_by_admin = false AND s.remark IS NOT NULL THEN 'rejected'
//                 ELSE 'pending'
//               END AS status
//        FROM sub_categories s
//        JOIN categories c ON s.category_id = c.id
//        ORDER BY s.id DESC`
//     );

//     res.status(200).json({
//       message: 'All subcategories fetched successfully',
//       subcategories: result.rows,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       message: 'Error fetching all subcategories',
//       error: err.message,
//     });
//   }
// };

// exports.getAllSubcategories = async (req, res) => {
//   try {
//     // Fetch pending subcategories (not yet approved)
//     const pendingResult = await pool.query(
//       `SELECT s.id, s.name_en AS name, c.name_en AS category_name, 
//               s.remark,
//               'pending' AS status
//        FROM sub_categories s
//        JOIN categories c ON s.category_id = c.id
//        WHERE s.approved_by_admin = false
//        ORDER BY s.id DESC`
//     );

//     // Fetch approved subcategories
//     const approvedResult = await pool.query(
//       `SELECT s.id, s.name_en AS name, c.name_en AS category_name, 
//               s.remark,
//               'approved' AS status
//        FROM sub_categories s
//        JOIN categories c ON s.category_id = c.id
//        WHERE s.approved_by_admin = true
//        ORDER BY s.id DESC`
//     );

//     res.status(200).json({
//       message: 'Subcategories fetched successfully',
//       pending: pendingResult.rows,
//       approved: approvedResult.rows,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       message: 'Error fetching subcategories',
//       error: err.message,
//     });
//   }
// };



exports.getAllSubcategories = async (req, res) => {
  const vendor_id = req.user.id;

  try {
    const result = await pool.query(
      `SELECT s.id, s.name_en, s.slug, s.description, c.name_en AS category_name,
              s.remark,
              CASE
                WHEN s.approved_by_admin = true THEN 'approved'
                WHEN s.approved_by_admin = false AND s.remark IS NOT NULL THEN 'rejected'
                ELSE 'pending'
              END AS status
       FROM sub_categories s
       JOIN categories c ON s.category_id = c.id
       WHERE s.vendor_id = $1
       ORDER BY s.id DESC`,
      [vendor_id]
    );

    res.status(200).json({
      message: 'All subcategories fetched successfully',
      subcategories: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error fetching all subcategories',
      error: err.message,
    });
  }
};


// Get approved subcategories by category_id and vendor_id
exports.getApprovedByCategoryAndVendor = async (req, res) => {
  const vendor_id = req.user.id;
  const { category_id } = req.query;

  if (!category_id) {
    return res.status(400).json({ message: 'category_id is required' });
  }

  try {
    const result = await pool.query(
      `SELECT s.id, s.name_en, s.slug, s.description, c.name_en AS category_name,
              s.remark,
              CASE
                WHEN s.approved_by_admin = true THEN 'approved'
                WHEN s.approved_by_admin = false AND s.remark IS NOT NULL THEN 'rejected'
                ELSE 'pending'
              END AS status
       FROM sub_categories s
       JOIN categories c ON s.category_id = c.id
       WHERE s.is_active = true
         AND s.approved_by_admin = true
         AND s.vendor_id = $1
         AND s.category_id = $2
       ORDER BY s.id DESC`,
      [vendor_id, category_id]
    );

    res.status(200).json({
      message: 'Approved subcategories fetched successfully',
      subcategories: result.rows,
    });
  } catch (err) {
    console.error('Error in getApprovedByCategoryAndVendor:', err.message);
    res.status(500).json({
      message: 'Error fetching approved subcategories by category and vendor',
      error: err.message,
    });
  }
};
