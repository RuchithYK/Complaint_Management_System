import { useEffect, useState } from "react";
import axios from "axios";
import "./AttemptedComplaints.css";

const AttemptedComplaints = ({ engineerName }) => {
  const [complaints, setComplaints] = useState([]);

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

  const reUpdateStatus = async (complaintId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/complaints/status/${complaintId}`, {
        status: newStatus,
      });
      fetchData();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="attempted-container">
      <h2 className="attempted-title">Assigned Complaints</h2>

      {complaints.length === 0 ? (
        <p className="attempted-empty">No complaints found.</p>
      ) : (
        <>
          <div className="attempted-header">
            <div>Complaint ID</div>
            <div>Domain</div>
            <div>Description</div>
            <div>Employee</div>
            <div>Status</div>
            <div>Re-Update</div>
          </div>

          {complaints.map((c) => (
            <div key={c._id} className="attempted-row">
              <div>{c.complaintId}</div>
              <div>{c.domain}</div>
              <div className="attempted-desc">{c.description}</div>
              <div>{c.employeeName}</div>
              <div>
                <span className="attempted-status">{c.status}</span>
              </div>
              <div>
                <select
                  className="attempted-select"
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
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default AttemptedComplaints;
