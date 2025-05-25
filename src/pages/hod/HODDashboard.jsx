import React from "react";
import Sidebar from "../../components/Sidebar"; // adjust path
import { Outlet } from "react-router-dom";

const HODDashboard = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Outlet /> {/* Renders nested routes like complaints, engineers, etc. */}
      </div>
    </div>
  );
};

export default HODDashboard;
