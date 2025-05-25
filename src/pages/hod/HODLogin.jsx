import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HODLogin.css"; // Assuming you have some CSS for styling

const HODLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/hod/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        navigate("/hod/dashboard"); // or "/hod" based on your routes
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Login failed");
    }
  };

  return (
    <div className="hod-login-page">
      <h2 id="hod-name">Manager Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          id="hod-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          id="hod-password"
        />
        <button id="hod-btn" type="submit">Login</button>
        <button className="logout-btn" onClick={handleLogout}>
            Home 
        </button>
      </form>
    </div>
  );
};

export default HODLogin;
