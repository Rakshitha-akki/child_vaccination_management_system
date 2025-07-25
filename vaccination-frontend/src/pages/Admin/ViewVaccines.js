import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ViewVaccines = () => {
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVaccines();
  }, []);

  const fetchVaccines = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/vaccines/all");
      setVaccines(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching vaccines:", error.message);
      setLoading(false);
    }
  };

  const getStockLabel = (availability) => {
    return availability ? "Stock" : "Out of Stock";
  };

  const getStockColor = (availability) => {
    return availability ? "#28a745" : "#dc3545";
  };

  const formatAge = (ageInDays) => {
    if (ageInDays < 30) return `${ageInDays} day${ageInDays === 1 ? "" : "s"}`;
    const months = Math.floor(ageInDays / 30);
    return `${months} month${months === 1 ? "" : "s"}`;
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading...</p>;

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => navigate("/admin-dashboard")}>
        ⬅ Back to Dashboard
      </button>
      <h2>All Vaccines</h2>
      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Dose</th>
            <th style={styles.th}>Age Group</th>
            <th style={styles.th}>Availability</th>
          </tr>
        </thead>
        <tbody>
          {vaccines.map((vaccine) => (
            <tr key={vaccine._id}>
              <td style={styles.td}>{vaccine.vname}</td>
              <td style={styles.td}>{vaccine.description}</td>
              <td style={styles.td}>{vaccine.dose_number}</td>
              <td style={styles.td}>{formatAge(vaccine.age_grp)}</td>
              <td style={{ ...styles.td, color: getStockColor(vaccine.availability), fontWeight: "bold" }}>
                {getStockLabel(vaccine.availability)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
  },
  backButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginTop: "20px",
  },
  thead: {
    backgroundColor: "#e0e0e0",
  },
  th: {
    padding: "12px",
    border: "1px solid #ccc",
    textAlign: "left",
  },
  td: {
    padding: "10px",
    border: "1px solid #ccc",
  },
};

export default ViewVaccines;
