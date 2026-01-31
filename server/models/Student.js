const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    referralCode: {
      type: String,
      unique: true
    },
    totalSpent: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
