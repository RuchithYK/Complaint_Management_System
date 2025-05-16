const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");

// GET all complaints
router.get("/", async (req, res) => {
  const complaints = await Complaint.find();
  res.json(complaints);
});

// POST - Create a new complaint with custom complaintId
router.post("/", async (req, res) => {
  try {
    const count = await Complaint.countDocuments();
    const complaintId = `complaint${(count + 1).toString().padStart(3, "0")}`;

    const newComplaint = new Complaint({
      complaintId,
      ...req.body,
    });

    await newComplaint.save();
    res.status(201).json({ message: "Complaint created", complaint: newComplaint });
  } catch (error) {
    console.error("Error creating complaint:", error);
    res.status(500).json({ message: "Error creating complaint" });
  }
});

// PATCH - Assign engineer using complaintId
router.patch("/assign/:complaintId", async (req, res) => {
  const { assignedEngineer } = req.body;
  try {
    await Complaint.findOneAndUpdate(
      { complaintId: req.params.complaintId },
      { assignedEngineer, status: "In Progress" }
    );
    res.json({ message: "Engineer assigned" });
  } catch (error) {
    res.status(500).json({ message: "Error assigning engineer" });
  }
});

// PATCH - Update complaint status
router.patch("/status/:complaintId", async (req, res) => {
  const { status } = req.body;
  try {
    await Complaint.findOneAndUpdate(
      { complaintId: req.params.complaintId },
      { status }
    );
    res.json({ message: "Status updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating status" });
  }
});

module.exports = router;
