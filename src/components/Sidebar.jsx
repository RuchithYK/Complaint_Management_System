import { NavLink, useNavigate, Outlet } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ role }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const links = {
    hod: [
      { path: "/hod/dashboard/complaints", label: "Complaint List" ,dash:"Manager"},
      { path: "/hod/dashboard/engineers", label: "Technician List" ,dash:"Manager"},
      { path: "/hod/dashboard/register", label: "Register Technician" ,dash:"Manager"},
    ],
    engineer: [
      { path: "/engineer/dashboard/assigned", label: "New Complaints",dash:"Technician" },
      { path: "/engineer/dashboard/attempted", label: "Attempted Queries",dash:"Technician" },
      { path: "/engineer/dashboard/change-password", label: "Change Password", dash:"Technician"},
    ],
    employee: [
      { path: "/employee/dashboard", label: "Dashboard",dash:"Employee" },
      { path: "/employee/dashboard/submit-complaint", label: "Submit Complaint" ,dash:"Employee"},
    ]
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 id="sidebar-title">Dashboard</h2>
        
        {links[role].map((link) => (
          <div className="side-links-container">
          <NavLink
            to={link.path}
            key={link.path}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            id="side-links"
          >
            {link.label}
          </NavLink>
          
          </div>
          
        ))}
        <div className="log-btn-container">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
        </button>
        </div>
      </aside>

    <div className="sidebar-layout">
      <header className="topbar">
          
        </header>
    {/* Your sidebar JSX here */}
    <main className="main-content">
      <Outlet />
    </main>
  </div>
    </div>
  );
};

export default Sidebar;
