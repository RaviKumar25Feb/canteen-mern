const Order = require("../models/Order");
const Student = require("../models/Student");
const Snack = require("../models/Snack");

exports.createOrder = async (req, res) => {
  try {
    const { studentId, snackId, quantity } = req.body;

    // validation
    if (!studentId || !snackId || !quantity) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // fetch snack
    const snack = await Snack.findById(snackId);
    if (!snack) {
      return res.status(404).json({ message: "Snack not found" });
    }

    // calculate amount 🔥
    const amount = snack.price * quantity;

    // create order
    const order = await Order.create({
      studentId,
      snackId,
      quantity,
      amount
    });

    // update student totalSpent
    await Student.findByIdAndUpdate(studentId, {
      $inc: { totalSpent: amount }
    });

    // update snack ordersCount
    await Snack.findByIdAndUpdate(snackId, {
      $inc: { ordersCount: quantity }
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("ORDER ERROR:", error.message);
    res.status(500).json({ message: "Order creation failed" });
  }
};
