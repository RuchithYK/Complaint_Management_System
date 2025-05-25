import "./EmployeeHome.css"
const EmployeeHome = ({ employee }) => {
  return (
    <div className="employee-home-container">
      <div className="employee-home-card">
        <h3 className="employee-home-title">Welcome, {employee?.name}!</h3>
        <p className="employee-home-subtitle">This is your Complaint dashboard.</p>
      </div>
    </div>
  );
};

export default EmployeeHome;
