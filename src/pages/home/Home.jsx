import { Link } from "react-router-dom";
import "./Home.css";


const Home = () => {
  return (
    <div className="home">
      <h1> Software Company Complaint Management System</h1>
      <br/>
      <div className="login-options">
      <Link to="/hod/login"><span>Manager Login</span></Link>
      <Link to="/engineer/login"><span>Technician Login</span></Link>
      <Link to="/employee/login"><span>Employee Login</span></Link>

      </div>
    </div>
  );
};

export default Home;
