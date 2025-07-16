const vendorDashboardModule = require('../model/vendorDashboardModule');

const getAllLocations = async (req, res) => {
  try {
    const vendorProfileId = req.user.id; // Must be present from verifyToken
    const locations = await vendorDashboardModule.getAllLocations(vendorProfileId);

    const result = locations.reduce((acc, row) => {
      let country = acc.find(c => c.id === row.country_id);
      if (!country) {
        country = { id: row.country_id, name: row.country_name, states: [] };
        acc.push(country);
      }

      if (row.state_id) {
        let state = country.states.find(s => s.id === row.state_id);
        if (!state) {
          state = { id: row.state_id, name: row.state_name, districts: [] };
          country.states.push(state);
        }

        if (row.district_id) {
          let district = state.districts.find(d => d.id === row.district_id);
          if (!district) {
            district = { id: row.district_id, name: row.district_name, cities: [] };
            state.districts.push(district);
          }

          if (row.city_id) {
            let city = district.cities.find(c => c.id === row.city_id);
            if (!city) {
              city = { id: row.city_id, name: row.city_name, pincodes: [] };
              district.cities.push(city);
            }

            if (row.pincode_id) {
              city.pincodes.push({
                id: row.pincode_id,
                pincode: row.pincode,
                is_enabled: row.pincode_enabled,
                vendor_profile_id: row.vendor_profile_id,
              });
            }
          }
        }
      }

      return acc;
    }, []);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

const enablePincode = async (req, res) => {
  const { pincode_id } = req.params;
  const vendorProfileId = req.user.id;

  try {
    const result = await vendorDashboardModule.togglePincodeStatus(pincode_id, true, vendorProfileId);
    res.status(200).json({ message: 'Pincode enabled successfully', data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

const disablePincode = async (req, res) => {
  const { pincode_id } = req.params;
  const vendorProfileId = req.user.id;

  try {
    const result = await vendorDashboardModule.togglePincodeStatus(pincode_id, false, vendorProfileId);
    res.status(200).json({ message: 'Pincode disabled successfully', data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

module.exports = {
  getAllLocations,
  enablePincode,
  disablePincode,
};
