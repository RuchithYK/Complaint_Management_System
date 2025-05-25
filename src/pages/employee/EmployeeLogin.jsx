import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../employee/EmployeeLogin.css"

const EmployeeLogin = ({ setEmployee }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
const handleLogout = () => {
    navigate("/");
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/employee/login", { username, password });
      setEmployee(res.data.employee);
      navigate("/employee/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login error");
    }
  };

  return (
    <div className="emp-login-page">
      <h2 id="emp-name">Employee Login</h2>
      <form onSubmit={handleLogin}>
        <input id="emp-input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        <input id="emp-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button id="emp-btn" type="submit">Login</button>
      </form>
      <button className="logout-btn" onClick={handleLogout}>
            Home 
        </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EmployeeLogin;
