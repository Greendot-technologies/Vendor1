
const pool = require('../config/db');

const getAllLocations = async (vendorProfileId) => {
  try {
    const query = `
      SELECT 
        c.id AS country_id, c.name AS country_name,
        s.id AS state_id, s.name AS state_name,
        d.id AS district_id, d.name AS district_name,
        ct.id AS city_id, ct.name AS city_name,
        p.id AS pincode_id, p.pincode, p.is_enabled AS pincode_enabled, p.vendor_profile_id
      FROM countries c
      LEFT JOIN states s ON c.id = s.country_id
      LEFT JOIN districts d ON s.id = d.state_id
      LEFT JOIN cities ct ON d.id = ct.district_id
      LEFT JOIN pincodes p ON ct.id = p.city_id
      WHERE p.vendor_profile_id = $1 OR p.vendor_profile_id IS NULL
      ORDER BY c.name, s.name, d.name, ct.name, p.pincode;
    `;
    const result = await pool.query(query, [vendorProfileId]);
    return result.rows;
  } catch (error) {
    throw new Error(`Failed to fetch locations: ${error.message}`);
  }
};



const togglePincodeStatus = async (pincodeId, isEnabled, vendorProfileId) => {
  try {
    const pincodeCheck = await pool.query(
      `SELECT id, vendor_profile_id FROM pincodes 
       WHERE id = $1 AND (vendor_profile_id = $2 OR vendor_profile_id IS NULL)`,
      [pincodeId, vendorProfileId]
    );

    if (pincodeCheck.rows.length === 0) {
      throw new Error('Pincode not found or not allowed for this vendor');
    }

    const result = await pool.query(
      `UPDATE pincodes 
       SET is_enabled = $1, vendor_profile_id = $2 
       WHERE id = $3 
       RETURNING *`,
      [isEnabled, vendorProfileId, pincodeId]
    );

    return result.rows[0];
  } catch (error) {
    throw new Error(`Failed to toggle pincode status: ${error.message}`);
  }
};


module.exports = {
  getAllLocations,
  togglePincodeStatus,
};
