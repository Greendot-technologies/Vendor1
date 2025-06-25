const express = require('express');
const { verifyToken, authorizeRoles } = require('../middleware/authmiddleware');
const vendorDashboardController = require('../controller/vendorDashboardController');
const router = express.Router();

// Fetch all locations
router.get('/locations', verifyToken, authorizeRoles('vendor'), vendorDashboardController.getAllLocations);

// Enable a pincode
router.put('/pincodes/:pincode_id/enable', verifyToken, authorizeRoles('vendor'), vendorDashboardController.enablePincode);

// Disable a pincode
router.put('/pincodes/:pincode_id/disable', verifyToken, authorizeRoles('vendor'), vendorDashboardController.disablePincode);

module.exports = router;


// const vendorDashboardModule = require('../model/vendorDashboardModule');

// const getAllLocations = async (req, res) => {
//   try {
//     const locations = await vendorDashboardModule.getAllLocations();
//     // Transform data into a hierarchical structure for easier frontend consumption
//     const result = locations.reduce((acc, row) => {
//       let country = acc.find(c => c.id === row.country_id);
//       if (!country) {
//         country = { id: row.country_id, name: row.country_name, states: [] };
//         acc.push(country);
//       }

//       if (row.state_id) {
//         let state = country.states.find(s => s.id === row.state_id);
//         if (!state) {
//           state = { id: row.state_id, name: row.state_name, is_enabled: row.state_enabled, districts: [] };
//           country.states.push(state);
//         }

//         if (row.district_id) {
//           let district = state.districts.find(d => d.id === row.district_id);
//           if (!district) {
//             district = { id: row.district_id, name: row.district_name, cities: [] };
//             state.districts.push(district);
//           }

//           if (row.city_id) {
//             let city = district.cities.find(c => c.id === row.city_id);
//             if (!city) {
//               city = { id: row.city_id, name: row.city_name, pincodes: [] };
//               district.cities.push(city);
//             }

//             if (row.pincode_id) {
//               city.pincodes.push({ id: row.pincode_id, pincode: row.pincode });
//             }
//           }
//         }
//       }

//       return acc;
//     }, []);

//     res.status(200).json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message || 'Server error' });
//   }
// };

// const enableState = async (req, res) => {
//   const { state_id } = req.params;

//   try {
//     const result = await vendorDashboardModule.toggleStateStatus(state_id, true);
//     res.status(200).json({ message: 'State enabled successfully', data: result });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message || 'Server error' });
//   }
// };

// const disableState = async (req, res) => {
//   const { state_id } = req.params;

//   try {
//     const result = await vendorDashboardModule.toggleStateStatus(state_id, false);
//     res.status(200).json({ message: 'State disabled successfully', data: result });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message || 'Server error' });
//   }
// };

// module.exports = {
//   getAllLocations,
//   enableState,
//   disableState,
// };


// const express = require("express");
// const vendorDashboardController = require("../controller/vendorDashboardController");

// const router = express.Router();

// // Define your routes using the controller
// router.get("/locations", vendorDashboardController.getAllLocations);
// router.post("/state/:state_id/enable", vendorDashboardController.enableState);
// router.post("/state/:state_id/disable", vendorDashboardController.disableState);

// module.exports = router;

