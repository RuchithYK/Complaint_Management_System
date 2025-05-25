// src/components/Layout.jsx
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./Layout.css";

const Layout = ({ showSidebar = true }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // or redirect to /hod/login, etc. based on role
  };

  return (
    <div className="layout-container">
      <header className="layout-header">
        <h1>Complaint Management System</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>
      <div className="layout-content">
        {showSidebar && (
          <aside className="layout-sidebar">
            {/* Your role-based Sidebar here */}
          </aside>
        )}
        <main className="layout-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
