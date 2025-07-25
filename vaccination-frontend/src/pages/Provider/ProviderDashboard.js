import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProviderDashboard.css"; // Custom CSS for background etc.

const ProviderDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="provider-dashboard">
      <nav className="navbar">
        <div className="brand">Provider Panel</div>
        <div className="nav-links">
            <button onClick={() => navigate("/provider/vaccines")}>Vaccines</button>


        

          

          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>
    </div>
  );
};

export default ProviderDashboard;
