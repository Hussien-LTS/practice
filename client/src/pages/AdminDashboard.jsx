import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user?.name}! You have admin access.</p>

      {/* Example: Admin Controls */}
      <div>
        <h2>Manage Users</h2>
        <p>Here you can add/remove users (future feature).</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
