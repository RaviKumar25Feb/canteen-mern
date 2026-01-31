const express = require("express");
const router = express.Router();

const {
  getStudents,
  getStudentById,
  createStudent
} = require("../controllers/studentController");

// GET all students
router.get("/", getStudents);

// GET student detail + orders
router.get("/:id", getStudentById);

// Create student
router.post("/createStudent", createStudent);

module.exports = router;
