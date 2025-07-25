import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const SuccessMessage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { scheduledDate, remainingDays } = location.state || {};

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "2.5rem",
          borderRadius: "16px",
          textAlign: "center",
          maxWidth: "500px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
        }}
      >
        <FaCheckCircle size={60} color="#28a745" />
        <h2 style={{ marginTop: "1rem", fontWeight: "600" }}>Schedule Added Successfully!</h2>
        {scheduledDate && (
          <>
            <p style={{ marginTop: "1rem", fontSize: "16px" }}>
              Vaccination is scheduled for: <strong>{new Date(scheduledDate).toDateString()}</strong>
            </p>
            <p style={{ fontSize: "16px" }}>
              Days remaining: <strong>{remainingDays}</strong> day(s)
            </p>
          </>
        )}

        <button
          onClick={() => navigate("/schedule-list")}
          style={{
            marginTop: "2rem",
            padding: "12px 24px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Back to Schedule
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
