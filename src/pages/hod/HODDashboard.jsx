import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar"; // Adjust the import path as necessary

const HODDashboard = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar role="hod" />
      <div style={{ flex: 1, padding: "1rem" }}>
        <h2>Manager Dashboard</h2>
      </div>
    </div>
  );
};

export default HODDashboard;
