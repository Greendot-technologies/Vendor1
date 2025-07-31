
const express = require("express");
const router = express.Router();
const controller = require("../controller/vendorLocationController");
const { verifyToken, authorizeRoles } = require("../middleware/authmiddleware");

// Routes requiring authentication
router.post(
  "/",
  verifyToken,
  authorizeRoles("vendor", "company"),
  controller.addLocation
);
router.get("/", verifyToken, authorizeRoles("vendor", "company"), controller.getLocations);
router.put(
  "/toggle/:locationId",
  verifyToken,
  authorizeRoles("vendor", "company"),
  controller.toggleLocationStatus
);

// Public routes (no authentication required)
router.get("/countries", controller.getCountries);
router.get("/states/:country_id", controller.getStates);
router.get("/districts/:state_id", controller.getDistricts);
router.get("/cities/:district_id", controller.getCities);
router.get("/pincodes/:city_id", controller.getPincodes);

module.exports = router;
