import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import { useState } from "react";
import HODLogin from "./pages/hod/HODLogin";
import HODDashboard from "./pages/hod/HODDashboard";
import HODComplaintList from "./pages/hod/HODComplaintList";
import EngineerList from "./pages/hod/EngineerList";
import RegisterEngineer from "./pages/hod/RegisterEngineer";
import EmployeeLogin from "./pages/employee/EmployeeLogin";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import EngineerLogin from "./pages/engineer/EngineerLogin";
import EngineerDashboard from "./pages/engineer/EngineerDashboard";
import AttemptedComplaints from "./pages/engineer/AttemptedComplaints"
import ChangePassword from "./pages/engineer/ChangePassword";
import EngineerAssignedComplaints from "./pages/engineer/EngineerAssignedComplaints";
import SubmitComplaint from "./pages/employee/SubmitComplaint";


const App = () => {
  const [employee, setEmployee] = useState(null);
  const [engineer, setEngineer] = useState(null);
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        <Route path="/employee/login" element={<EmployeeLogin setEmployee={setEmployee} />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboard employee={employee} />} />
        <Route path="/employee/submit-complaint" element={<SubmitComplaint employee={employee} />}/>

        <Route path="/hod/login" element={<HODLogin />} />
        <Route path="/hod/dashboard" element={<HODDashboard />}/>
        <Route path="/hod/complaints" element={<HODComplaintList />} />
        <Route path="/hod/engineers" element={<EngineerList />} />
        <Route path="/hod/register" element={<RegisterEngineer />} />
        

        <Route path="/engineer/login" element={<EngineerLogin setEngineer={setEngineer}/>}/>
        <Route path="/engineer/dashboard" element={<EngineerDashboard/>}/>
        <Route path="/engineer/attempted" element={<AttemptedComplaints engineerName={engineer?.name} />}/>
        <Route path="/engineer/change-password" element={<ChangePassword username={engineer?.name}/>}/>
        <Route path="/engineer/assigned" element={<EngineerAssignedComplaints engineer={engineer} />} />

      </Routes>
    </Router>
  );
};

export default App;
