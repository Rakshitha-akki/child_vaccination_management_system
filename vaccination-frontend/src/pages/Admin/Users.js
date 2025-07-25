import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParents = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/parents");
        setParents(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching parents", err);
        setLoading(false);
      }
    };

    fetchParents();
  }, []);

  return (
    <div className="users-page">
      <style>
        {`
          .users-page {
            background-image: url("/images/photo.avif");
            background-size: cover;
            background-position: center;
            min-height: 100vh;
            padding: 2rem;
            font-family: sans-serif;
          }

          .top-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            color: #fff;
          }

          .back-btn {
            padding: 8px 16px;
            background-color: #1976d2;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
          }

          .back-btn:hover {
            background-color: #145ca8;
          }

          .table-container {
            max-width: 900px;
            margin: 0 auto;
            background-color: rgba(255, 255, 255, 0.85);
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          table th,
          table td {
            border: 1px solid #ccc;
            padding: 10px;
            text-align: left;
          }

          table th {
            background-color: #f0f0f0;
          }
        `}
      </style>

      <div className="top-bar">
        <button className="back-btn" onClick={() => navigate("/admin-dashboard")}>
          ← Back to Dashboard
        </button>
        <h2>Registered Parents</h2>
      </div>

      <div className="table-container">
        {loading ? (
          <p>Loading...</p>
        ) : parents.length === 0 ? (
          <p>No parents found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Registered At</th>
              </tr>
            </thead>
            <tbody>
              {parents.map((parent, index) => (
                <tr key={parent._id}>
                  <td>{index + 1}</td>
                  <td>{parent.name}</td>
                  <td>{parent.email}</td>
                  <td>{parent.phone}</td>
                  <td>{parent.role}</td>
                  <td>{new Date(parent.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Users;
