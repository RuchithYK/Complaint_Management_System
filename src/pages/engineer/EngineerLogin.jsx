// src/pages/engineer/EngineerLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./EngineerLogin.css";

const EngineerLogin = ({ setEngineer }) => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
const handleLogout = () => {
    navigate("/");
  };
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/engineer/login", formData);
      if (res.data.success) {
        setEngineer(res.data.engineer); // Always set this      
        navigate("/engineer/dashboard");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Login failed. Please try again.");
    }
  };

  return (
  <div className="eng-login-page-container">
    <div className="eng-login-page">
      <h2 id="eng-login">Technician Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          id="eng-name"
        /><br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          id="eng-password"
        /><br />
        <button id="eng-btn" type="submit">Login</button>
        <button className="logout-btn" onClick={handleLogout}>
            Home 
        </button>
      </form>
    </div>
  </div>  
  );
};

export default EngineerLogin;
