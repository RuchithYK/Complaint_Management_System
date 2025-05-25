import { useEffect, useState } from "react";
import axios from "axios";
import "./EnginnerList.css";

const EngineerList = () => {
  const [engineers, setEngineers] = useState([]);

  const fetchEngineers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/hod/engineers");
      setEngineers(res.data);
    } catch (error) {
      console.error("Error fetching engineers", error);
    }
  };

  useEffect(() => {
    fetchEngineers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/hod/engineers/${id}`);
      fetchEngineers();
    } catch (error) {
      console.error("Error deleting engineer", error);
    }
  };

  return (
    <div className="engineer-list-container">
      <h2 className="engineer-heading">Engineer List</h2>
      <div className="engineer-list-header">
        <div>Name</div>
        <div>Department</div>
        <div>Password</div>
        <div>Action</div>
      </div>

      {engineers.map((eng) => (
        <div className="engineer-list-row" key={eng._id}>
          <div>{eng.name}</div>
          <div>{eng.department}</div>
          <div>{eng.password}</div>
          <div>
            <button className="delete-btn" onClick={() => handleDelete(eng._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EngineerList;
