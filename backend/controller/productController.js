
// agri_market_backend/controllers/productController.js
const pool = require("../config/db");
const fs = require("fs");
const path = require("path");

//---------------------- Api for Add Products -----------------------------------------------------------------
exports.addProduct = async (req, res) => {
  try {
    const {
      category_id,
      subcategory_id,
      name,
      description,
      brand,
      price,
      stock_quantity,
      unit,
      vendor_id,
      discount_percentage,
    } = req.body;

    const discounted_price = discount_percentage
      ? (price - price * (discount_percentage / 100)).toFixed(2)
      : price;

    const result = await pool.query(
      `INSERT INTO products 
       (category_id, subcategory_id, name, description, brand, price, stock_quantity, unit, vendor_id, discount_percentage, discounted_price)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id`,
      [
        category_id,
        subcategory_id,
        name,
        description,
        brand,
        price,
        stock_quantity,
        unit,
        vendor_id,
        discount_percentage,
        discounted_price,
      ]
    );

    const productId = result.rows[0].id;

    if (req.files && req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        const imageUrl = `/uploads/${req.files[i].filename}`;
        await pool.query(
          `INSERT INTO product_images (product_id, image_url, is_primary)
           VALUES ($1, $2, $3)`,
          [productId, imageUrl, i === 0]
        );
      }
    }

    res.status(201).json({ message: "Product created", productId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding product" });
  }
};

//---------------------- Api for get all Products -----------------------------------------------------------------
exports.getAllProducts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.id, p.name, p.description, p.brand, p.price, p.discount_percentage,
        p.discounted_price, p.stock_quantity, p.unit, p.is_active, p.created_at,
        json_agg(
          json_build_object('id', pi.id, 'image_url', pi.image_url, 'is_primary', pi.is_primary)
        ) AS images
      FROM products p
      LEFT JOIN product_images pi ON p.id = pi.product_id
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `);

    res.status(200).json({ products: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
};
//---------------------- Api for update Products -----------------------------------------------------------------
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      category_id,
      subcategory_id,
      name,
      description,
      brand,
      price,
      stock_quantity,
      unit,
      vendor_id,
      discount_percentage,
    } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Collect only the fields that are provided
    const fieldsToUpdate = {};
    if (category_id) fieldsToUpdate.category_id = category_id;
    if (subcategory_id) fieldsToUpdate.subcategory_id = subcategory_id;
    if (name) fieldsToUpdate.name = name;
    if (description) fieldsToUpdate.description = description;
    if (brand) fieldsToUpdate.brand = brand;
    if (price) fieldsToUpdate.price = price;
    if (stock_quantity) fieldsToUpdate.stock_quantity = stock_quantity;
    if (unit) fieldsToUpdate.unit = unit;
    if (vendor_id) fieldsToUpdate.vendor_id = vendor_id;
    if (discount_percentage) fieldsToUpdate.discount_percentage = discount_percentage;

    // Calculate discounted_price if price and discount_percentage both are given
    if (price && discount_percentage) {
      const discounted_price = (price - price * (discount_percentage / 100)).toFixed(2);
      fieldsToUpdate.discounted_price = discounted_price;
    }

    if (Object.keys(fieldsToUpdate).length === 0 && !(req.files && req.files.length > 0)) {
      return res.status(400).json({ message: "No fields provided for update" });
    }

    // Build dynamic update query
    let query = "UPDATE products SET";
    const values = [];
    let index = 1;

    for (const [key, value] of Object.entries(fieldsToUpdate)) {
      query += ` ${key} = $${index},`;
      values.push(value);
      index++;
    }

    query = query.slice(0, -1); // remove trailing comma
    query += ` WHERE id = $${index} RETURNING id`;
    values.push(id);

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Handle new image uploads
    if (req.files && req.files.length > 0) {
      // Optional: Delete old images first
      await pool.query(`DELETE FROM product_images WHERE product_id = $1`, [id]);

      for (let i = 0; i < req.files.length; i++) {
        const imageUrl = `/uploads/${req.files[i].filename}`;
        await pool.query(
          `INSERT INTO product_images (product_id, image_url, is_primary)
           VALUES ($1, $2, $3)`,
          [id, imageUrl, i === 0]
        );
      }
    }

    res.status(200).json({ message: "Product updated", productId: id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating product" });
  }
};
//---------------------- Api for delete Products -----------------------------------------------------------------
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const images = await pool.query(
      `SELECT image_url FROM product_images WHERE product_id = $1`,
      [id]
    );
    images.rows.forEach((img) => {
      const imgPath = path.join(__dirname, "..", img.image_url);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    });

    await pool.query(`DELETE FROM products WHERE id = $1`, [id]);

    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting product" });
  }
};
//---------------------- Api for get product images only -----------------------------------------------------------------
exports.getProductImages = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT image_url FROM product_images WHERE product_id = $1`,
      [id]
    );
    const images = result.rows.map((img) => ({
      url: `${req.protocol}://${req.get("host")}${img.image_url}`,
    }));
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching product images" });
  }
};



// GET /api/products/vendor/:vendorId
exports.getProductsByVendor = async (req, res) => {
  const vendorId = parseInt(req.params.vendorId);

  if (isNaN(vendorId)) {
    return res.status(400).json({ error: 'Invalid vendor ID' });
  }

  try {
    const result = await pool.query(
      `SELECT p.*, 
              COALESCE(json_agg(
                json_build_object(
                  'id', i.id,
                  'image_url', i.image_url,
                  'is_primary', i.is_primary
                )
              ) FILTER (WHERE i.id IS NOT NULL), '[]') AS images
       FROM products p
       LEFT JOIN product_images i ON p.id = i.product_id
       WHERE p.vendor_id = $1 AND p.is_active = true
       GROUP BY p.id
       ORDER BY p.created_at DESC`,
      [vendorId]
    );

    res.json({ products: result.rows });
  } catch (err) {
    console.error('Error fetching vendor products:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};




//------------------------ End of product controller ----------------------------------------------------