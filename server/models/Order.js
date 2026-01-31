const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },
    snackId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Snack",
      required: true
    },
    quantity: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
