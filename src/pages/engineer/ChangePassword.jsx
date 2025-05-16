import { useState } from "react";
import axios from "axios";
import "./ChangePassword.css";

const ChangePassword = ({ username }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match");
      return;
    }

    try {
      const res = await axios.put(`http://localhost:5000/api/engineer/change-password/${username}`, {
        oldPassword,
        newPassword
      });
      
      setMessage("Password updated successfully");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="change-password-page">
      <h2>Change Password</h2>
      <form className="changepass-form"onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button className="changepass-btn" type="submit">Update Password</button>
      </form>
      {message && <p className="status">{message}</p>}
    </div>
  );
};

export default ChangePassword;
