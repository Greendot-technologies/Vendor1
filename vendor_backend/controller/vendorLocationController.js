
const pool = require("../config/db");

// Add location
exports.addLocation = async (req, res) => {
  const vendor_id = req.user.id; // ✅ comes from JWT
  const { country_id, state_id, district_id, city_id, pincode_id } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO vendor_company_locations
        (vendor_id, country_id, state_id, district_id, city_id, pincode_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [vendor_id, country_id, state_id, district_id, city_id, pincode_id]
    );

    res.status(201).json({ success: true, location: result.rows[0] });
  } catch (err) {
    console.error("Error adding location:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all locations of logged-in vendor
exports.getLocations = async (req, res) => {
  const vendor_id = req.user.id;

  try {
    const result = await pool.query(
      `SELECT vcl.*, 
              c.name as country_name, 
              s.name as state_name, 
              d.name as district_name, 
              ct.name as city_name, 
              p.pincode as pincode
       FROM vendor_company_locations vcl
       LEFT JOIN countries c ON vcl.country_id = c.id
       LEFT JOIN states s ON vcl.state_id = s.id
       LEFT JOIN districts d ON vcl.district_id = d.id
       LEFT JOIN cities ct ON vcl.city_id = ct.id
       LEFT JOIN pincodes p ON vcl.pincode_id = p.id
       WHERE vcl.vendor_id = $1`,
      [vendor_id]
    );
    res.json({ success: true, locations: result.rows });
  } catch (err) {
    console.error("Error fetching locations:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Toggle location enable/disable
exports.toggleLocationStatus = async (req, res) => {
  const vendor_id = req.user.id;
  const locationId = req.params.locationId;

  try {
    const existing = await pool.query(
      `SELECT * FROM vendor_company_locations WHERE id = $1 AND vendor_id = $2`,
      [locationId, vendor_id]
    );

    if (existing.rowCount === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Location not found or unauthorized",
        });
    }

    const currentStatus = existing.rows[0].is_enabled;
    const updated = await pool.query(
      `UPDATE vendor_company_locations SET is_enabled = $1 WHERE id = $2 RETURNING *`,
      [!currentStatus, locationId]
    );

    res.json({ success: true, updatedLocation: updated.rows[0] });
  } catch (err) {
    console.error("Error toggling location status:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Fetch all countries
exports.getCountries = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name FROM countries ORDER BY name`
    );
    res.json({ success: true, countries: result.rows });
  } catch (err) {
    console.error("Error fetching countries:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Fetch states by country
exports.getStates = async (req, res) => {
  const { country_id } = req.params;

  try {
    const result = await pool.query(
      `SELECT id, name FROM states WHERE country_id = $1 ORDER BY name`,
      [country_id]
    );
    res.json({ success: true, states: result.rows });
  } catch (err) {
    console.error("Error fetching states:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Fetch districts by state
exports.getDistricts = async (req, res) => {
  const { state_id } = req.params;

  try {
    const result = await pool.query(
      `SELECT id, name FROM districts WHERE state_id = $1 ORDER BY name`,
      [state_id]
    );
    res.json({ success: true, districts: result.rows });
  } catch (err) {
    console.error("Error fetching districts:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Fetch cities by district
exports.getCities = async (req, res) => {
  const { district_id } = req.params;

  try {
    const result = await pool.query(
      `SELECT id, name FROM cities WHERE district_id = $1 ORDER BY name`,
      [district_id]
    );
    res.json({ success: true, cities: result.rows });
  } catch (err) {
    console.error("Error fetching cities:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Fetch pincodes by city
exports.getPincodes = async (req, res) => {
  const { city_id } = req.params;

  try {
    const result = await pool.query(
      `SELECT id, pincode FROM pincodes WHERE city_id = $1 ORDER BY pincode`,
      [city_id]
    );
    res.json({ success: true, pincodes: result.rows });
  } catch (err) {
    console.error("Error fetching pincodes:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};