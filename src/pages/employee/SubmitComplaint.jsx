import { useState } from "react";
import axios from "axios";
import "./SubmitComplaint.css";

const SubmitComplaint = ({ employee }) => {
  const [domain, setDomain] = useState("Software");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/complaints", {
        employeeName: employee.name,
        domain,
        description,
      });
      setMessage("Complaint submitted successfully");
      setDescription("");
    } catch (err) {
      setMessage("Failed to submit complaint");
      console.error("Complaint submission error:", err);
    }
  };

  return (
    <div className="submit-complaint-container">
      
      <div className="form-wrapper">
        <h3 className="form-title">Submit a Complaint</h3>
        <form className="complaint-form" onSubmit={handleSubmit}>
          <p className="employee-name">Name: <strong>{employee.name}</strong></p>

          <label htmlFor="domain">Domain</label>
          <select
            id="domain"
            className="form-select"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          >
            <option value="Software">Software</option>
            <option value="Hardware">Hardware</option>
          </select>

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="form-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue..."
            required
          ></textarea>

          <button className="submit-btn" type="submit">Submit</button>
        </form>
        {message && <p className="status-message">{message}</p>}
      </div>
    </div>
  );
};

export default SubmitComplaint;
