import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Added for navigation
import {
  FaChild,
  FaCalendarAlt,
  FaVenusMars,
  FaTint,
  FaWeight,
  FaUserShield,
  FaPlusCircle,
} from "react-icons/fa";

const AddChild = () => {
  const [formData, setFormData] = useState({
    name: "",
    DOB: "",
    gender: "",
    blood_grp: "",
    weight: "",
    parent_id: "",
  });

  const [parents, setParents] = useState([]);
  const navigate = useNavigate(); // ✅ Initialize navigation

  // Fetch all parents
  useEffect(() => {
    const fetchParents = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/parents");
        setParents(res.data);
        console.log("Fetched parents:", res.data);
      } catch (err) {
        console.error("Failed to load parents:", err);
      }
    };

    fetchParents();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleParentSelect = (e) => {
    setFormData({ ...formData, parent_id: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/children/add-child", formData);
      alert("Child added successfully");
    } catch (err) {
      console.error("Add child error:", err.response?.data || err.message);
      alert("Error adding child: " + (err.response?.data?.message || "Server error"));
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/images/B1.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        position: "relative", // Required for absolute back button
      }}
    >
      {/* Back to Dashboard Button */}
      <div style={{ position: "absolute", top: "20px", left: "20px" }}>
        <button
          onClick={() => navigate("/admin-dashboard")}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Form Box */}
      <div
        style={{
          background: "rgba(255,255,255,0.7)",
          padding: "2rem",
          borderRadius: "16px",
          maxWidth: "450px",
          width: "100%",
          boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem", fontWeight: "600" }}>
          <FaChild style={{ marginRight: "10px" }} />
          Add Child
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaChild className="icon-left" />
            <input
              type="text"
              name="name"
              placeholder="Child Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaCalendarAlt className="icon-left" />
            <input type="date" name="DOB" onChange={handleChange} required />
          </div>

          <div className="input-group">
            <FaVenusMars className="icon-left" />
            <select name="gender" onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className="input-group">
            <FaTint className="icon-left" />
            <input
              type="text"
              name="blood_grp"
              placeholder="Blood Group"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaWeight className="icon-left" />
            <input
              type="number"
              step="0.1"
              name="weight"
              placeholder="Weight (kg)"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaUserShield className="icon-left" />
            <select
              name="parent_id"
              value={formData.parent_id}
              onChange={handleParentSelect}
              required
              style={{ width: "100%", padding: "10px", borderRadius: "8px" }}
            >
              <option value="">Select Parent</option>
              {parents.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name} - {p.email}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="submit-btn">
            <FaPlusCircle style={{ marginRight: "8px" }} />
            Add Child
          </button>
        </form>
      </div>

      {/* Inline CSS for input styling */}
      <style>{`
        .input-group {
          display: flex;
          align-items: center;
          margin-bottom: 1.2rem;
          gap: 0.8rem;
        }

        .icon-left {
          font-size: 1.2rem;
          color: #555;
          flex-shrink: 0;
        }

        .input-group input,
        .input-group select {
          flex: 1;
          padding: 10px 14px;
          border: 1px solid #ccc;
          border-radius: 10px;
          font-size: 16px;
          outline: none;
          transition: border 0.3s;
          background-color: #fff;
        }

        .input-group input:focus,
        .input-group select:focus {
          border-color: #007bff;
        }

        .submit-btn {
          width: 100%;
          padding: 12px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .submit-btn:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default AddChild;
