import { useEffect, useState } from "react";
import axios from "axios";
import "./HODComplaintList.css";

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
    <div className="complaint-list">
      <h2>Complaint List</h2>
      <table>
        <thead>
          <tr>
            <th>Serial No</th>
            <th>Type</th>
            <th>Description</th>
            <th>Status</th>
            <th>Employee Name</th>
            <th>Assigned Engineer</th>
            <th>Assign Task</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((c, index) => (
            <tr key={c.complaintId}>
              <td>{index + 1}</td>
              <td>{c.domain || "N/A"}</td>
              <td>{c.description}</td>
              <td>{c.status}</td>
              <td>{c.employeeName}</td>
              <td>{c.assignedEngineer}</td>
              <td>
                {c.assignedEngineer === "Not Assigned" ? (
                  <select onChange={(e) => assignEngineer(c.complaintId, e.target.value)} defaultValue="">
                    <option value="" disabled>Select Engineer</option>
                    {engineers.map((eng) => (
                      <option key={eng._id} value={eng.name}>
                        {eng.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  "Assigned"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HODComplaintList;
