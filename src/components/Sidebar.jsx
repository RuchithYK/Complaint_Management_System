import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ role }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // Return to home
  };

  const links = {
    hod: [
      { path: "/hod/complaints", label: "Complaint List" },
      { path: "/hod/engineers", label: "Technician List" },
      { path: "/hod/register", label: "Register Technician" },
    ],
    engineer: [
      { path: "/engineer/assigned", label: "New Assigned Complaints" },
      { path: "/engineer/attempted", label: "Attempted Queries" },
      { path: "/engineer/change-password", label: "Change Password" },
    ],
    employee: [
      { path: "/employee/dashboard", label: "Dashboard" },
      { path: "/employee/submit-complaint", label: "Submit Complaint" }, // ← If you have this
    ] 
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        {links[role].map((link) => (
          <NavLink
            to={link.path}
            key={link.path}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            {link.label}
          </NavLink>
        ))}
      </aside>
      <main className="main-content">
        <div className="top-bar">
          <h1>Complaint Management System</h1>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>

      </main>
    </div>
  );
};

export default Sidebar;
