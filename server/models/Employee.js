const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
});

module.exports = mongoose.model("Employee", employeeSchema);
