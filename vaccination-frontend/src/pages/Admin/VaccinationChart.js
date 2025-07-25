import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VaccinationChart = () => {
  const { childId } = useParams();
  const navigate = useNavigate();
  const [chart, setChart] = useState([]);
  const [childName, setChildName] = useState("");

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/vaccination/chart/${childId}`);
        setChart(res.data.chart);
        setChildName(res.data.childName || "Child");
      } catch (err) {
        console.error("Error fetching chart data:", err);
      }
    };

    fetchChart();
  }, [childId]);

  return (
    <div className="chart-page">
      <div className="top-bar">
        <button className="back-btn" onClick={() => navigate("/view-child")}>
          ← Back to Child List
        </button>
        <h2 className="heading">{childName}'s Vaccination Chart</h2>
      </div>

      <div className="chart-table-container">
        <table className="chart-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Vaccine Name</th>
              <th>Due Age</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {chart.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>No vaccine data found.</td>
              </tr>
            ) : (
              chart.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.vaccineName}</td>
                  <td>{item.dueAge}</td>
                  <td
                    style={{
                      color: item.status === "Completed" ? "green" : "orange",
                      fontWeight: "bold",
                    }}
                  >
                    {item.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .chart-page {
          padding: 2rem;
          background: #f8f9fa;
          min-height: 100vh;
        }

        .top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .back-btn {
          background-color: #6c757d;
          color: white;
          padding: 10px 16px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        }

        .back-btn:hover {
          background-color: #5a6268;
        }

        .heading {
          text-align: center;
          flex: 1;
          margin: 0;
          color: #333;
        }

        .chart-table-container {
          background: white;
          padding: 1.5rem;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          overflow-x: auto;
        }

        .chart-table {
          width: 100%;
          border-collapse: collapse;
        }

        .chart-table th,
        .chart-table td {
          padding: 12px;
          border: 1px solid #ddd;
          text-align: center;
        }

        .chart-table th {
          background-color: #007bff;
          color: white;
        }

        .chart-table tr:nth-child(even) {
          background-color: #f2f2f2;
        }
      `}</style>
    </div>
  );
};

export default VaccinationChart;
