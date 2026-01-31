const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// database connect
const {dbConnect} = require("./config/dbConnect");
dbConnect();

// routes
const studentRoutes = require("./routes/studentRoutes");
const snackRoutes = require("./routes/snackRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/api/students", studentRoutes);
app.use("/api/snacks", snackRoutes);
app.use("/api/orders", orderRoutes);

// default route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Homepage</h1>");
});

// server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});
