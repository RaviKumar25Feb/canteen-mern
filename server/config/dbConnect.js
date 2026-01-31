const mongoose = require("mongoose");

const DATABASE_URL = process.env.DATABASE_URL;

exports.dbConnect = () => {
    mongoose.connect(DATABASE_URL)
    .then(() => {
        console.log("DB is connected successfully");
    }).catch((err) => {
        console.log("DB connection failed: ", err);
        process.exit(1);
    });
}