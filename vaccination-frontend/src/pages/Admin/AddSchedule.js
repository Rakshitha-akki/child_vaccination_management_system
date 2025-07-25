import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCalendarPlus, FaArrowLeft } from "react-icons/fa";

const AddSchedule = () => {
  const navigate = useNavigate();
  const [children, setChildren] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  const [formData, setFormData] = useState({
    child_id: "",
    vaccine_id: "",
    scheduled_date: "",
  });
  const [parentName, setParentName] = useState("");
  const [childAge, setChildAge] = useState("");

  useEffect(() => {
    fetchChildren();
  }, []);

  const fetchChildren = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/children/all");
      setChildren(res.data);
    } catch (err) {
      console.error("Error loading children:", err);
    }
  };

  const fetchVaccines = async (childAgeInDays) => {
    try {
      const res = await axios.get("http://localhost:3000/api/vaccines/all");
      const eligibleVaccines = res.data.filter(v => v.age_grp <= childAgeInDays);
      setVaccines(eligibleVaccines);
    } catch (err) {
      console.error("Error loading vaccines:", err);
    }
  };

  const handleChildSelect = (e) => {
    const selectedChildId = e.target.value;
    const selectedChild = children.find(child => child._id === selectedChildId);

    if (selectedChild) {
      setFormData({ ...formData, child_id: selectedChild._id });
      setParentName(selectedChild.parent_id?.name || "N/A");

      const dob = new Date(selectedChild.DOB);
      const today = new Date();
      const diffInDays = Math.floor((today - dob) / (1000 * 60 * 60 * 24));

      if (diffInDays < 30) {
        setChildAge(`${diffInDays} days`);
      } else if (diffInDays < 365) {
        setChildAge(`${Math.floor(diffInDays / 30)} months`);
      } else {
        setChildAge(`${Math.floor(diffInDays / 365)} years`);
      }

      fetchVaccines(diffInDays);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // POST to add the schedule
      await axios.post("http://localhost:3000/api/schedules/add-schedule", formData);

      // After success, navigate to SuccessMessage page with data
      const scheduled = new Date(formData.scheduled_date);
      const today = new Date();
      const diffTime = scheduled - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      navigate("/success-message", {
        state: {
          scheduledDate: formData.scheduled_date,
          remainingDays: diffDays,
        },
      });
    } catch (err) {
      console.error("Error adding schedule:", err.response?.data || err.message);
      alert("Error adding schedule: " + (err.response?.data?.message || "Server error"));
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
          background: "rgba(255,255,255,0.8)",
          padding: "2rem",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "550px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <button
            onClick={() => navigate("/admin-dashboard")}
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              padding: "10px 16px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaArrowLeft style={{ marginRight: "8px" }} /> Back to Dashboard
          </button>
        </div>

        <h2 style={{ textAlign: "center", marginBottom: "20px", fontWeight: "600" }}>
          <FaCalendarPlus style={{ marginRight: "10px" }} />
          Add Vaccination Schedule
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Select Child:</label>
            <select name="child_id" onChange={handleChildSelect} required>
              <option value="">Select Child</option>
              {children.map(child => (
                <option key={child._id} value={child._id}>
                  {child.name}
                </option>
              ))}
            </select>
          </div>

          {parentName && (
            <>
              <div className="info-text"><strong>Parent Name:</strong> {parentName}</div>
              <div className="info-text"><strong>Child Age:</strong> {childAge}</div>
            </>
          )}

          <div className="input-group">
            <label>Select Vaccine:</label>
            <select name="vaccine_id" onChange={handleChange} required>
              <option value="">Select Vaccine</option>
              {vaccines.map(vaccine => (
                <option key={vaccine._id} value={vaccine._id}>
                  {vaccine.vname} ({vaccine.description})
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>Scheduled Date:</label>
            <input type="date" name="scheduled_date" onChange={handleChange} required />
          </div>

          <button type="submit" className="submit-btn">Add Schedule</button>
        </form>
      </div>

      <style>{`
        .input-group {
          display: flex;
          flex-direction: column;
          margin-bottom: 1rem;
        }

        .input-group label {
          margin-bottom: 5px;
          font-weight: 500;
        }

        .input-group select,
        .input-group input {
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 16px;
        }

        .submit-btn {
          margin-top: 20px;
          width: 100%;
          padding: 12px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .submit-btn:hover {
          background-color: #218838;
        }

        .info-text {
          margin-bottom: 10px;
          font-size: 16px;
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default AddSchedule;
