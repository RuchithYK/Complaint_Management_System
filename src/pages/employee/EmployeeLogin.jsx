import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeeLogin = ({ setEmployee }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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
    <div className="login-page">
      <h2>Employee Login</h2>
      <form onSubmit={handleLogin}>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EmployeeLogin;
