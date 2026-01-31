const Snack = require("../models/Snack");

// GET all snacks
exports.getSnacks = async (req, res) => {
  try {
    const snacks = await Snack.find();
    res.json(snacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE snack
exports.createSnack = async (req, res) => {
  try {
    const { name, price} = req.body;

    // basic validation
    if (!name || !price) {
      return res
        .status(400)
        .json({ message: "Name and price are required" });
    }

    const snack = await Snack.create({
      name,
      price,
    });

    res.status(201).json(snack);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
