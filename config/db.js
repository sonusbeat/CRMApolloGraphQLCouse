const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log("Database Conected :)");
  } catch (error) {
    // Show custom message to console
    console.log("Can not connect to database !");

    // Show errors to console
    console.log(error);

    // To exit database if no connection has been stablished
    process.exit(1);
  }
};

module.exports = connectDB;
