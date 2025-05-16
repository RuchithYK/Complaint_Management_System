import { useEffect, useState } from "react";
import axios from "axios";
// import "./EngineerList.css";

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
      fetchEngineers(); // refresh list
    } catch (error) {
      console.error("Error deleting engineer", error);
    }
  };

  return (
    <div className="engineer-list">
      <h2>Engineer List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {engineers.map((eng) => (
            <tr key={eng._id}>
              <td>{eng.name}</td>
              <td>{eng.department}</td>
              <td>{eng.password}</td>
              <td>
                <button onClick={() => handleDelete(eng._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EngineerList;
