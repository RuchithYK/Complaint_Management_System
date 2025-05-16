import React, { useEffect, useState } from "react";

const EngineerAssignedComplaints = ({ engineer }) => {
  const [assignedComplaints, setAssignedComplaints] = useState([]);

  useEffect(() => {
    const fetchAssignedComplaints = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/engineer/assigned/${engineer.name}`
        );
        const data = await res.json();
        setAssignedComplaints(data);
      } catch (err) {
        console.error("Failed to fetch assigned complaints:", err);
      }
    };

    if (engineer?._id) {
      fetchAssignedComplaints();
    }
  }, [engineer]);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>New Assigned Complaints</h2>
      {assignedComplaints.length === 0 ? (
        <p>No new complaints assigned.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>Complaint ID</th>
              <th>Domain</th>
              <th>Description</th>
              <th>Employee Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {assignedComplaints.map((complaint) => (
              <tr key={complaint._id}>
                <td>{complaint.complaintId}</td>
                <td>{complaint.domain}</td>
                <td>{complaint.description}</td>
                <td>{complaint.employeeName}</td>
                <td>{complaint.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EngineerAssignedComplaints;
