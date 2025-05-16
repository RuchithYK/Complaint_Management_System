const express = require('express');
const router = express.Router();
const Engineer = require('../models/Engineer');
const Complaint = require('../models/Complaint');

// Engineer login
// backend: engineer login route
router.post("/login", async (req, res) => {
  const { name, password } = req.body;
  const engineer = await Engineer.findOne({ name, password });

  if (engineer) {
    res.json({ success: true, engineer });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});


// Get assigned complaints
router.get('/assigned/:name', async (req, res) => {
  try {
    const complaints = await Complaint.find({
      assignedEngineer: req.params.name,
      status: 'In Progress',
    });
    res.json(complaints);
  } catch (err) {
    console.error("Error fetching assigned complaints:", err);
    res.status(500).json({ message: "Failed to fetch assigned complaints" });
  }
});



// Change password
router.put('/change-password/:name', async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const engineer = await Engineer.findOne({ name: req.params.name });

  if (!engineer) {
    return res.status(404).json({ message: "Engineer not found" });
  }

  if (engineer.password !== oldPassword) {
    return res.status(401).json({ message: "Old password is incorrect" });
  }

  engineer.password = newPassword;
  await engineer.save();

  res.json({ success: true, message: "Password changed successfully" });
});


module.exports = router;
