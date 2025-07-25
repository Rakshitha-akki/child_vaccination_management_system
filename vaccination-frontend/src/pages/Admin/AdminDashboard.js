import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css"; // Custom CSS for background etc.

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear localStorage and redirect to login
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="admin-dashboard">
      <nav className="navbar">
        <div className="brand">Admin Panel</div>
        <div className="nav-links">
          <button onClick={() => navigate("/users")}>Users</button>

          <div className="dropdown">
            <button className="dropbtn">Children</button>
            <div className="dropdown-content">
              <button onClick={() => navigate("/add-child")}>Add Child</button>
              <button onClick={() => navigate("/view-child")}>View Child</button>
            </div>
          </div>

          
          <button onClick={() => navigate("/add-schedule")}>Add Schedule</button>
          <button onClick={() => navigate("/schedule-list")}>View Schedule</button>
          <button onClick={() => navigate("/admin/view-vaccines")}>View Vaccines</button>


          <button onClick={() => navigate("/")}>Logout</button>
        </div>
      </nav>
    </div>
  );
};

export default AdminDashboard;
