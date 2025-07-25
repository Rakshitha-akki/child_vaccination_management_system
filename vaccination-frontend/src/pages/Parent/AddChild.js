import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaChild,
  FaCalendarAlt,
  FaVenusMars,
  FaTint,
  FaWeight,
  FaPlusCircle,
  FaUserShield,
} from "react-icons/fa";

const AddChild = () => {
  const [formData, setFormData] = useState({
    name: "",
    DOB: "",
    gender: "",
    blood_grp: "",
    weight: "",
  });

  const [parentName, setParentName] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch parent from localStorage
  const parent = JSON.parse(localStorage.getItem("user"));
  const parentId = parent?.id;

  useEffect(() => {
    if (parent) {
      setParentName(parent.name);
    }
  }, [parent]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!parentId) {
      alert("Parent ID not found. Please log in again.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/children/add-child", {
        ...formData,
        parent_id: parentId,
      });

      alert("Child added successfully");
      navigate("/parent-dashboard");
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
      }}
    >
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
        <h2 style={{ textAlign: "center", marginBottom: "1rem", fontWeight: "600" }}>
          <FaChild style={{ marginRight: "10px" }} />
          Add Child
        </h2>

        {parentName && (
          <div className="info-text" style={{ marginBottom: "1rem", fontWeight: "bold", textAlign: "center" }}>
            <FaUserShield style={{ marginRight: "8px" }} />
            Logged in as: {parentName}
          </div>
        )}

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

          <button type="submit" className="submit-btn">
            <FaPlusCircle style={{ marginRight: "8px" }} />
            Add Child
          </button>
        </form>
      </div>

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
