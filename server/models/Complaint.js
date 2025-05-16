const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  complaintId: {
    type: String,
    unique: true,
    required: true,
  },
  domain: String,
  description: String,
  status: {
    type: String,
    default: "Not Completed",
  },
  employeeName: String,
  assignedEngineer: {
    type: String,
    default: "Not Assigned",
  }
});

module.exports = mongoose.model("Complaint", complaintSchema);
