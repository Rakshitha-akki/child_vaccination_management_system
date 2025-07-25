const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    child_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Child",
      required: true,
    },
    vaccine_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vaccine",
      required: true,
    },
    parent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    scheduled_date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Scheduled", "Completed"],
      default: "Scheduled",
    },
  },
  { timestamps: true }
);

// ✅ Add unique index to prevent duplicate schedules for same child on same date
scheduleSchema.index({ child_id: 1, scheduled_date: 1 }, { unique: true });

// ✅ Prevent OverwriteModelError
module.exports =
  mongoose.models.VaccinationSchedule ||
  mongoose.model("VaccinationSchedule", scheduleSchema, "vaccinationschedules");
