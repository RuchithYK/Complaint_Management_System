import { useEffect, useState } from "react";
import axios from "axios";
import "./HODComplaintList.css"; // Updated CSS file

const HODComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [engineers, setEngineers] = useState([]);

  const fetchData = async () => {
    const complaintRes = await axios.get("http://localhost:5000/api/hod/complaints");
    const engineerRes = await axios.get("http://localhost:5000/api/hod/engineers");
    setComplaints(complaintRes.data);
    setEngineers(engineerRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const assignEngineer = async (id, name) => {
    try {
      await axios.patch(`http://localhost:5000/api/complaints/assign/${id}`, {
        assignedEngineer: name,
      });
      fetchData(); // refresh list
    } catch (error) {
      console.error("Error assigning engineer", error);
    }
  };

  return (
    <div className="hod-list-container">
      <h2 className="hod-list-heading">Complaint List</h2>
      
      <div className="hod-list-header">
        <span>Serial No</span>
        <span>Type</span>
        <span>Description</span>
        <span>Status</span>
        <span>Employee Name</span>
        <span>Assigned Engineer</span>
        <span>Assign Task</span>
      </div>

      {complaints.map((c, index) => (
        <div key={c.complaintId} className="hod-list-row">
          <span>{index + 1}</span>
          <span>{c.domain || "N/A"}</span>
          <span className="hod-list-desc">{c.description}</span>
          <span>{c.status}</span>
          <span>{c.employeeName}</span>
          <span>{c.assignedEngineer}</span>
          <span>
            {c.assignedEngineer === "Not Assigned" ? (
              <select
                onChange={(e) => assignEngineer(c.complaintId, e.target.value)}
                defaultValue=""
                className="hod-list-select"
              >
                <option value="" disabled>Select Engineer</option>
                {engineers.map((eng) => (
                  <option key={eng._id} value={eng.name}>
                    {eng.name}
                  </option>
                ))}
              </select>
            ) : (
              <span className="hod-list-assigned">Assigned</span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
};

export default HODComplaintList;
