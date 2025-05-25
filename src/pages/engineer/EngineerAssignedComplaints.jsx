import React, { useEffect, useState } from "react";
import "./EngineerAssignedComplaints.css";

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
    <div className="complaint-list-container">
      <h2 className="complaint-heading">New Assigned Complaints</h2>

      {assignedComplaints.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "16px", color: "#636e72" }}>
          No new complaints assigned.
        </p>
      ) : (
        <>
          <div className="complaint-list-header">
            <div>Complaint ID</div>
            <div>Domain</div>
            <div>Description</div>
            <div>Employee</div>
            <div>Status</div>
          </div>

          {assignedComplaints.map((complaint) => (
            <div key={complaint._id} className="complaint-list-row">
              <div>{complaint.complaintId}</div>
              <div>{complaint.domain}</div>
              <div className="desc-cell">{complaint.description}</div>
              <div>{complaint.employeeName}</div>
              <div>
                <span className="assigned-label">{complaint.status}</span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default EngineerAssignedComplaints;
