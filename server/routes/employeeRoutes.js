const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const Complaint = require('../models/Complaint');

// Employee login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await Employee.findOne({ username, password });

  if (user) {
    res.json({
      success: true,
      employee: {
        name: user.name,
        username: user.username,
      }
    });
    
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});


// Submit complaint
router.post('/complaints', async (req, res) => {
  const { employeeName, domain, description } = req.body;
  const newComplaint = new Complaint({
    employeeName,
    domain,
    description,
    status: 'Not Completed',
    assignedEngineer: 'Not Assigned',
  });
  await newComplaint.save();
  res.json({ success: true });
});

module.exports = router;
