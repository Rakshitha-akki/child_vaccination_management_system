import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VaccinesPage = () => {
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  // Use environment variable for API URL
  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

  useEffect(() => {
    fetchVaccines();
  }, []);

  const fetchVaccines = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/vaccines/all`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setVaccines(data);
      setMessage(null);
    } catch (err) {
      console.error("Failed to fetch vaccines:", err.message);
      setMessage({ 
        type: "error", 
        text: "Failed to load vaccines. Please check your connection and try again." 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const vaccine = vaccines.find((v) => v._id === id);
      let location = "";

      if (!vaccine.availability) {
        location = prompt(
          "Enter the vaccine location (e.g., hospital name, clinic address):"
        );
        
        if (!location || location.trim() === "") {
          setMessage({ 
            type: "error", 
            text: "Location is required when making vaccine available." 
          });
          setTimeout(() => setMessage(null), 3000);
          return;
        }
      }

      const response = await axios.put(
        `${API_BASE_URL}/api/vaccines/update/${id}`, 
        { location: location.trim() }
      );

      if (response.status === 200) {
        setMessage({ 
          type: "success", 
          text: `Vaccine ${vaccine.availability ? 'marked as unavailable' : 'marked as available'} successfully.` 
        });
        fetchVaccines();
      }
    } catch (error) {
      console.error("Update error:", error);
      setMessage({ 
        type: "error", 
        text: "Failed to update vaccine. Please try again." 
      });
    } finally {
      setTimeout(() => setMessage(null), 5000);
    }
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
                <button 
                  onClick={() => handleUpdate(vaccine._id)} 
                  style={{
                    ...styles.button,
                    backgroundColor: vaccine.availability ? "#dc3545" : "#28a745",
                    opacity: loading ? 0.6 : 1
                  }}
                  disabled={loading}
                >
                  {loading ? "..." : vaccine.availability ? "Mark Unavailable" : "Mark Available"}
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
