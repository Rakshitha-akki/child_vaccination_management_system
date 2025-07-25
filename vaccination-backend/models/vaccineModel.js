const mongoose = require("mongoose");

// Define the schema
const vaccineSchema = new mongoose.Schema({
  vid: String,                      // Vaccine ID (custom)
  vname: String,                   // Vaccine Name
  age_grp: Number,                 // Eligible age group (in days)
  dose_number: String,            // Dose count (e.g., 1st, 2nd)
  description: String,            // Description of the vaccine
  availability: {                 // Is vaccine available or out of stock
    type: Boolean,
    default: false
  },
  location: {                     // New field: Available location
    type: String,
    default: ""
  }
}, {
  collection: "vaccine"           // MongoDB collection name
});

// Export the model
module.exports = mongoose.model("Vaccine", vaccineSchema, "vaccine");
