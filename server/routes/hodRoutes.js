const express = require('express');
const router = express.Router();
const HODUser = require('../models/HODUser.js');
const Engineer = require('../models/Engineer.js');
const Complaint = require('../models/Complaint.js');

// HOD login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await HODUser.findOne({ username, password });
  if (user) {
    res.json({ success: true, name: user.name });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Get all complaints
router.get('/complaints', async (req, res) => {
  const complaints = await Complaint.find();
  res.json(complaints);
});

// Assign complaint to engineer
router.put('/assign/:id', async (req, res) => {
  const { engineerName } = req.body;
  await Complaint.findByIdAndUpdate(req.params.id, { assignedEngineerName: engineerName });
  res.json({ success: true });
});

// Get all engineers
router.get('/engineers', async (req, res) => {
  const engineers = await Engineer.find();
  res.json(engineers);
});

// Register new engineer
router.post('/engineers', async (req, res) => {
  const { name, password, department } = req.body;
  const newEngineer = new Engineer({ name, password, department });
  await newEngineer.save();
  res.json({ success: true });
});

// Delete engineer
router.delete('/engineers/:id', async (req, res) => {
  try {
    const deleted = await Engineer.findByIdAndDelete(req.params.id);
    if (deleted) {
      res.json({ success: true });
    } else {
      res.status(404).json({ message: 'Engineer not found' });
    }
  } catch (error) {
    console.error("Error deleting engineer:", error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
