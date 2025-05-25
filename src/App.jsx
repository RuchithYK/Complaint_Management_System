import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import { useState } from "react";
import HODLogin from "./pages/hod/HODLogin";
import HODComplaintList from "./pages/hod/HODComplaintList";
import EngineerList from "./pages/hod/EngineerList";
import RegisterEngineer from "./pages/hod/RegisterEngineer";
import EmployeeLogin from "./pages/employee/EmployeeLogin";
import EngineerLogin from "./pages/engineer/EngineerLogin";
import AttemptedComplaints from "./pages/engineer/AttemptedComplaints"
import ChangePassword from "./pages/engineer/ChangePassword";
import EngineerAssignedComplaints from "./pages/engineer/EngineerAssignedComplaints";
import SubmitComplaint from "./pages/employee/SubmitComplaint";
import Sidebar from "./components/Sidebar"; // ✅ Adjust path if needed
import EmployeeHome from "./pages/employee/EmployeeHome";

const App = () => {
  const [employee, setEmployee] = useState(null);
  const [engineer, setEngineer] = useState(null);
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        <Route path="/employee/login" element={<EmployeeLogin setEmployee={setEmployee} />} />
        <Route path="/employee/dashboard" element={<Sidebar role="employee" />}>
          <Route index element={<EmployeeHome employee={employee} />} />
          <Route path="submit-complaint" element={<SubmitComplaint employee={employee} />} />
        </Route>


        <Route path="/hod/login" element={<HODLogin />} />

        <Route path="/hod/dashboard" element={<Sidebar role="hod" />}>
           <Route index element={<HODComplaintList />} />
          <Route path="complaints" element={<HODComplaintList />} />
          <Route path="register" element={<RegisterEngineer />} />
          <Route path="engineers" element={<EngineerList />} />
        </Route>
        

        <Route path="/engineer/login" element={<EngineerLogin setEngineer={setEngineer} />} />

        <Route path="/engineer/dashboard" element={<Sidebar role="engineer" />}>
          <Route index element={<EngineerAssignedComplaints engineer={engineer} />} />
          <Route path="assigned" element={<EngineerAssignedComplaints engineer={engineer} />} />
          <Route path="attempted" element={<AttemptedComplaints engineerName={engineer?.name} />} />
          <Route path="change-password" element={<ChangePassword username={engineer?.name} />} />
        </Route>


      </Routes>
    </Router>
  );
};

export default App;
