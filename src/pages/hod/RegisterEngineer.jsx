import { useState } from "react";
import axios from "axios";
import "./RegisterEngineer.css";

const RegisterEngineer = () => {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/hod/engineers", formData);
      alert("Engineer Registered Successfully");
      setFormData({ name: "", department: "", password: "" });
    } catch (error) {
      console.error("Error registering engineer", error);
      alert("Registration failed");
    }
  };

  return (
    <div className="register-engineer-container">
      <h2 className="register-title">Register New Engineer</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label className="register-label">Name:</label>
        <input
          className="register-input"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label className="register-label">Department:</label>
        <input
          className="register-input"
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        />

        <label className="register-label">Password:</label>
        <input
          className="register-input"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button className="register-btn" type="submit">
          Register Engineer
        </button>
      </form>
    </div>
  );
};

export default RegisterEngineer;
