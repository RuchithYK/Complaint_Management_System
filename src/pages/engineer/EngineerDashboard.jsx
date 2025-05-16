import Sidebar from "../../components/Sidebar";

const EngineerDashboard = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar role="engineer" />
      <div style={{ padding: "1rem" }}>
        <h2>Welcome Engineer 👷‍♂️</h2>
        <p>This is your dashboard.</p>
      </div>
    </div>
  );
};

export default EngineerDashboard;
