import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ViewChild = () => {
  const [children, setChildren] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/children/view-child");
        setChildren(res.data);
      } catch (err) {
        console.error("Failed to fetch children:", err);
      }
    };

    

    fetchChildren();
  }, []);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();

    const diffInMs = today - birthDate;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInDays < 30) return `${diffInDays} days`;
    else if (diffInDays < 365) return `${diffInMonths} months`;
    else return `${diffInYears} years`;
  };

  const handleViewChart = (childId) => {
    navigate(`/child/${childId}/chart`);
  };

  return (
    <div className="view-child-page">
      <div className="top-bar">
        <button className="back-btn" onClick={() => navigate("/admin-dashboard")}>
          ← Back to Dashboard
        </button>
        <h2 className="heading">Child Details</h2>
      </div>

      <div className="table-container">
        <table className="child-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Child Name</th>
              <th>Date of Birth</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Blood Group</th>
              <th>Weight (kg)</th>
              <th>Parent Name</th>
              <th>Actions</th> {/* ✅ New column */}
            </tr>
          </thead>
          <tbody>
            {children.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: "center" }}>No children found.</td>
              </tr>
            ) : (
              children.map((child, index) => (
                <tr key={child._id}>
                  <td>{index + 1}</td>
                  <td>{child.name}</td>
                  <td>{new Date(child.DOB).toLocaleDateString()}</td>
                  <td>{calculateAge(child.DOB)}</td>
                  <td>{child.gender}</td>
                  <td>{child.blood_grp}</td>
                  <td>{child.weight}</td>
                  <td>{child.parent_id?.name || "N/A"}</td>
                  <td>
                    <button
                      className="view-chart-btn"
                      onClick={() => handleViewChart(child._id)}
                    >
                      View Chart
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .view-child-page {
          padding: 2rem;
          background: url('/images/B1.avif') no-repeat center center/cover;
          min-height: 100vh;
        }

        .top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .back-btn {
          background-color: #007bff;
          color: white;
          padding: 10px 16px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        }

        .back-btn:hover {
          background-color: #0056b3;
        }

        .heading {
          text-align: center;
          flex: 1;
          margin: 0;
          color: #fff;
          text-shadow: 1px 1px 2px #000;
        }

        .table-container {
          background: rgba(255, 255, 255, 0.85);
          padding: 1.5rem;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
          overflow-x: auto;
        }

        .child-table {
          width: 100%;
          border-collapse: collapse;
        }

        .child-table th,
        .child-table td {
          padding: 12px;
          border: 1px solid #ccc;
          text-align: center;
        }

        .child-table th {
          background-color: #007bff;
          color: white;
        }

        .child-table tr:nth-child(even) {
          background-color: #f2f2f2;
        }

        .view-chart-btn {
          background-color: #28a745;
          color: white;
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .view-chart-btn:hover {
          background-color: #218838;
        }
      `}</style>
    </div>
  );
};

export default ViewChild;
