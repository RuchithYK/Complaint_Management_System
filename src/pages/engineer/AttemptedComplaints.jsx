import { useEffect, useState } from "react";
import axios from "axios";
// import "./EngineerComplaints.css";

const AttemptedComplaints = ({ engineerName }) => {
  const [complaints, setComplaints] = useState([]);

  // Fetch complaints assigned to this engineer
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/complaints");
      const assigned = res.data.filter((c) => c.assignedEngineer === engineerName);
      setComplaints(assigned);
    } catch (err) {
      console.error("Error fetching complaints:", err);
    }
  };

  useEffect(() => {
    if (engineerName) {
      fetchData();
    }
  }, [engineerName]);

  // Update complaint status by complaintId (not Mongo _id)
  const reUpdateStatus = async (complaintId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/complaints/status/${complaintId}`, {
        status: newStatus,
      });
      fetchData(); // Refresh list after update
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="engineer-page" style={{ padding: "1rem" }}>
      <h2>Assigned Complaints</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Complaint ID</th>
            <th>Domain</th>
            <th>Description</th>
            <th>Employee Name</th>
            <th>Status</th>
            <th>Re-Update</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((c) => (
            <tr key={c._id}>
              <td>{c.complaintId}</td>
              <td>{c.domain}</td>
              <td>{c.description}</td>
              <td>{c.employeeName}</td>
              <td>{c.status}</td>
              <td>
                <select
                  defaultValue=""
                  onChange={(e) => reUpdateStatus(c.complaintId, e.target.value)}
                >
                  <option value="" disabled>
                    Update Again
                  </option>
                  <option value="Completed">Completed</option>
                  <option value="Not Able to Complete">Not Able to Complete</option>
                  <option value="In Progress">In Progress</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttemptedComplaints;
