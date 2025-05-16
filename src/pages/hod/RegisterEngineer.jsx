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
    <div className="register-engineer">
      <h2>Register New Engineer</h2>
      <form className="reg-form" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input name="name" value={formData.name} onChange={handleChange} required />

        <label>Department:</label>
        <input name="department" value={formData.department} onChange={handleChange} required />

        <label>Password:</label>
        <input name="password" type="password" value={formData.password} onChange={handleChange} required />

        <button className="reg-btn" type="submit">Register Engineer</button>
      </form>
    </div>
  );
};

export default RegisterEngineer;
