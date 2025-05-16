import Sidebar from "../../components/Sidebar";

const EmployeeDashboard = ({ employee }) => {
  return (
    <>
      <Sidebar role="employee" />
      <div className="main-content">
        <div className="top-strip">
          <h2>Complaint Management System</h2>
          <button onClick={() => (window.location.href = "/")}>Logout</button>
        </div>
        <h3>Welcome, {employee.name}!</h3>
        <p>This is your dashboard.</p>
      </div>
    </>
  );
};

export default EmployeeDashboard;
