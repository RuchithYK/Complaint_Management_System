import Complaint from "../models/Complaint.js";

// GET all complaints (HOD view)
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch complaints" });
  }
};

// POST a new complaint (Employee raises complaint)
export const createComplaint = async (req, res) => {
  const { title, description, category, employeeName } = req.body;
  try {
    const complaint = new Complaint({
      title,
      description,
      category,
      employeeName,
      status: "Pending", // default already set in schema
    });
    await complaint.save();
    res.status(201).json({ message: "Complaint raised successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to raise complaint" });
  }
};

// PUT update complaint (status update, engineer assignment)
export const updateComplaint = async (req, res) => {
  try {
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedComplaint);
  } catch (err) {
    res.status(500).json({ error: "Error updating complaint" });
  }
};

// GET complaints by employee name
export const getComplaintsByEmployee = async (req, res) => {
  const { employeeUsername } = req.params;
  try {
    const complaints = await Complaint.find({ employeeUsername });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving complaints', error });
  }
};

