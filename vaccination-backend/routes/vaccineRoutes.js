const express = require("express");
const router = express.Router();
const {
  updateVaccineAvailability,
  viewAllVaccines,
} = require("../controllers/vaccineController");

// ✅ Route: Get all vaccines
router.get("/all", viewAllVaccines);

// ✅ Route: Update vaccine availability and optional location
router.put("/update/:id", updateVaccineAvailability);

module.exports = router;
