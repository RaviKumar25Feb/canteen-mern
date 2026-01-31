const Student = require("../models/Student");
const Order = require("../models/Order");

//create student
exports.createStudent = async (req, res) => {
  const { name } = req.body;

  const referralCode = "REF" + Math.floor(1000 + Math.random() * 9000);

  const student = await Student.create({
    name,
    referralCode
  });

  res.status(201).json(student);
};


//get all students
exports.getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};


//get single student complete details
exports.getStudentById = async (req, res) => {
  const studentId = req.params.id;
  // student fetch
  const student = await Student.findById(studentId);
  // student ke saare orders
  const orders = await Order.find({ studentId })
    .populate("snackId", "name price");
  // response
  res.json({ student, orders });
};
