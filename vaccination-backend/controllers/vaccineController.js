const Vaccine = require("../models/vaccineModel");

// GET all vaccines
exports.viewAllVaccines = async (req, res) => {
  try {
    const vaccines = await Vaccine.find();
    res.status(200).json(vaccines);
  } catch (error) {
    console.error("Error fetching vaccines:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/vaccines/update/:id
exports.updateVaccineAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { location } = req.body; // Accept location from frontend

    const vaccine = await Vaccine.findById(id);
    if (!vaccine) {
      return res.status(404).json({ error: "Vaccine not found" });
    }

    // Toggle availability
    vaccine.availability = !vaccine.availability;

    // If availability is true and location is provided, set it
    if (vaccine.availability && location) {
      vaccine.location = location;
    } else if (!vaccine.availability) {
      vaccine.location = ""; // Clear location if unavailable
    }

    await vaccine.save();

    res.status(200).json({
      message: "Availability status updated",
      updatedAvailability: vaccine.availability ? "Stock" : "Out of Stock",
      location: vaccine.location
    });
  } catch (error) {
    console.error("Error updating vaccine:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
