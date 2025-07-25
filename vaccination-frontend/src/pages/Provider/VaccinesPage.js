import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VaccinesPage = () => {
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVaccines();
  }, []);

  const fetchVaccines = () => {
    fetch("http://localhost:3000/api/vaccines/all")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setVaccines(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch vaccines:", err.message);
        alert("Backend error. Check console for details.");
        setLoading(false);
      });
  };

  const handleUpdate = async (id) => {
    try {
      const vaccine = vaccines.find((v) => v._id === id);
      let location = "";

      if (!vaccine.availability) {
        // Prompt for location when marking available
        location = prompt("Enter the vaccine location (e.g., hospital or camp name):");
        if (!location || location.trim() === "") {
          alert("Update cancelled. Location is required when making vaccine available.");
          return;
        }
      }

      await axios.put(`http://localhost:3000/api/vaccines/update/${id}`, { location });
      setMessage({ type: "success", text: "Availability status toggled." });
      fetchVaccines();
    } catch (error) {
      console.error("Update error:", error.message);
      setMessage({ type: "error", text: "Update failed." });
    }

    setTimeout(() => setMessage(null), 3000);
  };

  const getStockColor = (availability) => {
    return availability ? "#28a745" : "#dc3545";
  };

  const formatAge = (ageInDays) => {
    if (ageInDays < 30) return `${ageInDays} day${ageInDays === 1 ? "" : "s"}`;
    const months = Math.floor(ageInDays / 30);
    return `${months} month${months === 1 ? "" : "s"}`;
  };

  const handleBackToDashboard = () => {
    navigate("/provider-dashboard");
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading...</p>;

  return (
    <div style={styles.container}>
      <h2>Manage Vaccine Stock</h2>

      {message && (
        <div
          style={{
            ...styles.alert,
            backgroundColor: message.type === "success" ? "#d4edda" : "#f8d7da",
            color: message.type === "success" ? "#155724" : "#721c24",
          }}
        >
          {message.text}
        </div>
      )}

      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Dose</th>
            <th style={styles.th}>Age Group</th>
            <th style={styles.th}>Availability</th>
            <th style={styles.th}>Location</th>
            <th style={styles.th}>Update</th>
          </tr>
        </thead>
        <tbody>
          {vaccines.map((vaccine) => (
            <tr key={vaccine._id}>
              <td style={styles.td}>{vaccine.vname}</td>
              <td style={styles.td}>{vaccine.description}</td>
              <td style={styles.td}>{vaccine.dose_number}</td>
              <td style={styles.td}>{formatAge(vaccine.age_grp)}</td>
              <td
                style={{
                  ...styles.td,
                  color: getStockColor(vaccine.availability),
                  fontWeight: "bold",
                }}
              >
                {vaccine.availability ? "Stock" : "Out of Stock"}
              </td>
              <td style={styles.td}>
                {vaccine.availability ? vaccine.location || "-" : "-"}
              </td>
              <td style={styles.td}>
                <button onClick={() => handleUpdate(vaccine._id)} style={styles.button}>
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleBackToDashboard} style={styles.backButton}>
        Back to Dashboard
      </button>
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
  button: {
    padding: "6px 10px",
    backgroundColor: "#007b5e",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  alert: {
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "5px",
    fontWeight: "bold",
  },
  backButton: {
    padding: "8px 16px",
    backgroundColor: "#007b5e",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default VaccinesPage;
