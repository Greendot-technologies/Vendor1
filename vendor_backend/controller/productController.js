const pool = require("../config/db");
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

// Initialize S3 client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

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

    if (!name || !price || !category_id) {
      return res.status(400).json({ message: "Name, price, and category_id are required" });
    }

    // Parse inputs as integers
    const parsedPrice = parseInt(price, 10);
    const parsedDiscountPercentage = discount_percentage ? parseInt(discount_percentage, 10) : 0;
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      return res.status(400).json({ message: "Price must be a non-negative integer" });
    }
    if (parsedDiscountPercentage < 0 || parsedDiscountPercentage > 100) {
      return res.status(400).json({ message: "Discount percentage must be between 0 and 100" });
    }

    // Calculate discounted_price as integer
    const discounted_price = parsedDiscountPercentage
      ? Math.round(parsedPrice * (1 - parsedDiscountPercentage / 100))
      : parsedPrice;

    // Step 1: Insert product data
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
        parsedPrice,
        stock_quantity,
        unit,
        vendor_id,
        parsedDiscountPercentage,
        discounted_price,
      ]
    );

    const productId = result.rows[0].id;

    // Step 2: Insert S3 image URLs into product_images
    if (req.s3ImageUrls && req.s3ImageUrls.length > 0) {
      for (let i = 0; i < req.s3ImageUrls.length; i++) {
        const imageUrl = req.s3ImageUrls[i];
        await pool.query(
          `INSERT INTO product_images (product_id, image_url, is_primary)
           VALUES ($1, $2, $3)`,
          [productId, imageUrl, i === 0]
        );
      }
    }

    res.status(201).json({ message: "Product created", productId });
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({ message: "Error adding product", error: error.message });
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
    console.error("Fetch Products Error:", error);
    res.status(500).json({ message: "Error fetching products", error: error.message });
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

    // Collect fields to update
    const fieldsToUpdate = {};
    if (category_id) fieldsToUpdate.category_id = category_id;
    if (subcategory_id) fieldsToUpdate.subcategory_id = subcategory_id;
    if (name) fieldsToUpdate.name = name;
    if (description) fieldsToUpdate.description = description;
    if (brand) fieldsToUpdate.brand = brand;
    if (price) {
      const parsedPrice = parseInt(price, 10);
      if (isNaN(parsedPrice) || parsedPrice < 0) {
        return res.status(400).json({ message: "Price must be a non-negative integer" });
      }
      fieldsToUpdate.price = parsedPrice;
    }
    if (stock_quantity) fieldsToUpdate.stock_quantity = stock_quantity;
    if (unit) fieldsToUpdate.unit = unit;
    if (vendor_id) fieldsToUpdate.vendor_id = vendor_id;
    if (discount_percentage) {
      const parsedDiscountPercentage = parseInt(discount_percentage, 10);
      if (parsedDiscountPercentage < 0 || parsedDiscountPercentage > 100) {
        return res.status(400).json({ message: "Discount percentage must be between 0 and 100" });
      }
      fieldsToUpdate.discount_percentage = parsedDiscountPercentage;
    }

    // Calculate discounted_price if price or discount_percentage is provided
    if (price && discount_percentage) {
      fieldsToUpdate.discounted_price = Math.round(
        parseInt(price, 10) * (1 - parseInt(discount_percentage, 10) / 100)
      );
    } else if (price && !discount_percentage) {
      fieldsToUpdate.discounted_price = parseInt(price, 10);
    }

    if (
      Object.keys(fieldsToUpdate).length === 0 &&
      !(req.s3ImageUrls && req.s3ImageUrls.length > 0)
    ) {
      return res.status(400).json({ message: "No fields provided for update" });
    }

    // Build dynamic update query
    let query = "UPDATE products SET ";
    const values = [];
    let index = 1;

    for (const [key, value] of Object.entries(fieldsToUpdate)) {
      query += `${key} = $${index}, `;
      values.push(value);
      index++;
    }

    query = query.slice(0, -2); // Remove trailing comma and space
    query += ` WHERE id = $${index} RETURNING id`;
    values.push(id);

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Handle new image uploads to S3
    if (req.s3ImageUrls && req.s3ImageUrls.length > 0) {
      // Delete old images from S3 and database
      const images = await pool.query(
        `SELECT image_url FROM product_images WHERE product_id = $1`,
        [id]
      );
      await Promise.all(
        images.rows.map(async (img) => {
          const key = img.image_url.split(
            `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/`
          )[1];
          try {
            await s3.send(
              new DeleteObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME,
                Key: key,
              })
            );
          } catch (s3Error) {
            console.error(`Failed to delete S3 object ${key}:`, s3Error);
          }
        })
      );
      await pool.query(`DELETE FROM product_images WHERE product_id = $1`, [id]);

      // Insert new S3 image URLs
      for (let i = 0; i < req.s3ImageUrls.length; i++) {
        const imageUrl = req.s3ImageUrls[i];
        await pool.query(
          `INSERT INTO product_images (product_id, image_url, is_primary)
           VALUES ($1, $2, $3)`,
          [id, imageUrl, i === 0]
        );
      }
    }

    res.status(200).json({ message: "Product updated", productId: id });
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
};

//---------------------- Api for delete Products -----------------------------------------------------------------
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if product exists
    const productCheck = await pool.query(`SELECT id FROM products WHERE id = $1`, [id]);
    if (productCheck.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete images from S3
    const images = await pool.query(
      `SELECT image_url FROM product_images WHERE product_id = $1`,
      [id]
    );
    await Promise.all(
      images.rows.map(async (img) => {
        const key = img.image_url.split(
          `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/`
        )[1];
        try {
          await s3.send(
            new DeleteObjectCommand({
              Bucket: process.env.S3_BUCKET_NAME,
              Key: key,
            })
          );
        } catch (s3Error) {
          console.error(`Failed to delete S3 object ${key}:`, s3Error);
        }
      })
    );

    // Delete from database
    await pool.query(`DELETE FROM product_images WHERE product_id = $1`, [id]);
    await pool.query(`DELETE FROM products WHERE id = $1`, [id]);

    res.status(200).json({ message: "Product deleted", productId: id });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: "Error deleting product", error: error.message });
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
      url: img.image_url,
    }));
    res.status(200).json(images);
  } catch (error) {
    console.error("Fetch Product Images Error:", error);
    res.status(500).json({ message: "Error fetching product images", error: error.message });
  }
};

//---------------------- Api for get vendor products -----------------------------------------------------------------
exports.getMyProducts = async (req, res) => {
  const vendorId = req.user.id;

  try {
    const result = await pool.query(
      `SELECT p.*, 
              json_agg(json_build_object(
                'id', pi.id,
                'image_url', pi.image_url,
                'is_primary', pi.is_primary
              )) AS images
       FROM products p
       LEFT JOIN product_images pi ON p.id = pi.product_id
       WHERE p.vendor_id = $1
       GROUP BY p.id
       ORDER BY p.created_at DESC`,
      [vendorId]
    );

    res.status(200).json({ products: result.rows });
  } catch (error) {
    console.error("Error fetching products for vendor:", error);
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
};

//---------------------- Api for get vendor profile -----------------------------------------------------------------
exports.getProfile = async (req, res) => {
  const vendorId = req.user.id;
  try {
    const result = await pool.query(
      "SELECT id, name, email FROM vendor_profiles WHERE id = $1",
      [vendorId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.status(200).json({ vendor: result.rows[0] });
  } catch (error) {
    console.error("Error fetching vendor profile:", error);
    res.status(500).json({ message: "Error fetching vendor profile", error: error.message });
  }
};