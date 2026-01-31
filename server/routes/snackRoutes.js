const express = require("express");
const router = express.Router();

const { getSnacks, createSnack } = require("../controllers/snackController");

// GET all snacks
router.get("/", getSnacks);

// CREATE snack
router.post("/createSnack", createSnack);

module.exports = router;
