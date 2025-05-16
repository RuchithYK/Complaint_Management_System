import { useState } from "react";
import axios from "axios";
import "./SubmitComplaint.css"; // Assuming you have some CSS for styling
const SubmitComplaint = ({ employee }) => {
  const [domain, setDomain] = useState("Software");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/complaints", {
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
    <div className="main-content">
      <div className="top-strip">
        <h2>Complaint Management System</h2>
        <button onClick={() => (window.location.href = "/")}>Logout</button>
      </div>
      <h3>Submit a Complaint</h3>
      <form onSubmit={handleSubmit}>
        <p>Name: <strong>{employee.name}</strong></p>
        <select value={domain} onChange={(e) => setDomain(e.target.value)}>
          <option value="Software">Software</option>
          <option value="Hardware">Hardware</option>
        </select>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the issue..."
          required
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SubmitComplaint;
