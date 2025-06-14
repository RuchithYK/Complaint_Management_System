const mongoose = require('mongoose');

const engineerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  department: { type: String, required: true }
});

module.exports = mongoose.model('Engineer', engineerSchema);
