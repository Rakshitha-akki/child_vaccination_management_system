import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ParentDashboard = () => {
  const navigate = useNavigate();
  const [parentName, setParentName] = useState("");
  const [parentId, setParentId] = useState("");
  const [children, setChildren] = useState([]);

  useEffect(() => {

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setParentName(storedUser.name || "Parent");
      setParentId(storedUser._id); // Set parentId from user object
    }
    

    const fetchParentData = async () => {
      try {
        const token = localStorage.getItem("token"); // assuming you're using JWT
        const res = await axios.get("http://localhost:3000/api/parents/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setParentName(res.data.parent.name);
        setChildren(res.data.children);
      } catch (err) {
        console.error("Failed to fetch parent data", err);
      }
    };

    fetchParentData();
  }, []);

  return (
    <div className="dashboard">
      <div className="header">
        <h2>Parent Dashboard</h2>
        <button className="logout" onClick={() => navigate("/login")}>Logout</button>
      </div>

      <div className="welcome-section">
        <h3>Welcome, {parentName}</h3>
        <p>Manage your child's vaccination records easily.</p>
      </div>

      <div className="actions">
        <div className="card" onClick={() => navigate("/parent/add-child")}>
          <span role="img" aria-label="add">👤➕</span>
          <p>Add Child</p>
        </div>
        <div className="card" onClick={() => navigate("/parent/vaccination-history")}>
          <span role="img" aria-label="history">📋</span>
          <p>Vaccination History</p>
        </div>
        {/* <div className="card" onClick={() => navigate("/parent/vaccination-schedule")}>
          <span role="img" aria-label="schedule">💉</span>
          <p>Vaccination Schedule</p>
        </div> */}
      </div>

      <style>{`
        .dashboard {
          padding: 2rem;
          text-align: center;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #007bff;
          color: white;
          padding: 1rem 2rem;
        }
        .logout {
          background: red;
          color: white;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .welcome-section {
          margin-top: 2rem;
        }
        .actions {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 2rem;
        }
        .card {
          background: white;
          padding: 1.5rem;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          cursor: pointer;
          width: 200px;
          transition: transform 0.2s;
        }
        .card:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </div>
  );
};

export default ParentDashboard;
