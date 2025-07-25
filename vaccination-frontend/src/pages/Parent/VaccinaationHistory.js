import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import VaccinationReport from "./VaccinationReport";

const VaccinationHistory = () => {
  const [children, setChildren] = useState([]);
  const [history, setHistory] = useState({});
  const [expandedChildIds, setExpandedChildIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChildrenAndHistory = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const parentId = user?._id || user?.id;
      const parentName = user?.name || "Parent";

      if (!parentId) return;

      try {
        const childRes = await axios.get(
          `http://localhost:3000/api/children/parent/${parentId}`
        );
        // Attach parentName to each child
        const childrenWithParent = childRes.data.map((child) => ({
          ...child,
          parentName,
        }));
        setChildren(childrenWithParent);

        const historyRes = await axios.get(
          `http://localhost:3000/api/vaccination/history/${parentId}`
        );
        setHistory(historyRes.data.history);
      } catch (err) {
        console.error("Error loading vaccination history:", err);
      }
    };

    fetchChildrenAndHistory();
  }, []);

  const toggleDropdown = (childId) => {
    setExpandedChildIds((prev) =>
      prev.includes(childId)
        ? prev.filter((id) => id !== childId)
        : [...prev, childId]
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div style={styles.container}>
      <style>{`
        .back-button {
          background-color: #007bff;
          color: white;
          padding: 10px 16px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .back-button:hover {
          background-color: #0056b3;
        }
        .heading {
          text-align: center;
          font-size: 24px;
          margin-bottom: 20px;
        }
        .child-card {
          margin-bottom: 20px;
          border-radius: 6px;
          border: 1px solid #ccc;
          background: rgba(255, 255, 255, 0.85);
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        }
        .child-header {
          padding: 15px;
          background-color: #e6f0ff;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .child-header:hover {
          background-color: #d0e4ff;
        }
        .child-body {
          padding: 15px;
          overflow-x: auto;
        }
        .vaccine-table {
          width: 100%;
          border-collapse: collapse;
        }
        .vaccine-table th, .vaccine-table td {
          border: 1px solid #ccc;
          padding: 10px;
          text-align: left;
        }
        .vaccine-table th {
          background-color: #cce5ff;
        }
        .vaccine-table tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        .vaccine-table tr:nth-child(odd) {
          background-color: #ffffff;
        }
        .status.completed {
          color: green;
          font-weight: bold;
        }
        .status.scheduled {
          color: orange;
          font-weight: bold;
        }
        .status.upcoming {
          color: gray;
          font-weight: bold;
        }
        .loading {
          text-align: center;
          font-style: italic;
        }
        .no-data {
          text-align: center;
          color: #666;
          font-style: italic;
        }
        .top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .report-btn {
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 8px 14px;
          cursor: pointer;
          margin-left: 10px;
        }
        .report-btn:hover {
          background-color: #218838;
        }
        .report-btn.disabled, .report-btn[disabled] {
          background-color: #cccccc !important;
          color: #888 !important;
          cursor: not-allowed !important;
          pointer-events: none;
        }
      `}</style>

      <div className="top-bar">
        <button
          className="back-button"
          onClick={() => navigate("/parent-dashboard")}
        >
          ← Back to Dashboard
        </button>
        <h2 className="heading">Vaccination History</h2>
      </div>

      {children.length === 0 ? (
        <p className="no-data">No children found.</p>
      ) : (
        children.map((child) => {
          const completedVaccines = (history[child._id] || []).filter(
            (v) => v.status === "Completed"
          );
          return (
            <div key={child._id} className="child-card">
              <div
                className="child-header"
                onClick={() => toggleDropdown(child._id)}
              >
                <span>
                  {child.name} ({child.gender}) - DOB: {formatDate(child.DOB)}
                </span>
                {completedVaccines.length === 0 ? (
                  <button
                    className="report-btn disabled"
                    disabled
                  >
                    Download PDF
                  </button>
                ) : (
                  <PDFDownloadLink
                    document={
                      <VaccinationReport
                        child={child}
                        records={completedVaccines}
                      />
                    }
                    fileName={`${child.name}_Vaccination_Report.pdf`}
                    style={{
                      textDecoration: "none",
                      color: "white",
                      backgroundColor: "#28a745",
                      border: "none",
                      borderRadius: "4px",
                      padding: "8px 14px",
                      cursor: "pointer",
                      marginLeft: "10px",
                      fontSize: "16px",
                    }}
                  >
                    {({ loading }) =>
                      loading ? "Preparing..." : "Download PDF"
                    }
                  </PDFDownloadLink>
                )}
              </div>

              {expandedChildIds.includes(child._id) && (
                <div className="child-body">
                  <table className="vaccine-table">
                    <thead>
                      <tr>
                        <th>Vaccine</th>
                        <th>Due Age</th>
                        <th>Scheduled Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history[child._id] ? (
                        history[child._id].map((v, index) => (
                          <tr key={index}>
                            <td>{v.vaccineName}</td>
                            <td>{v.dueAge}</td>
                            <td>
                              {v.status === "Upcoming"
                                ? "Not Scheduled"
                                : v.scheduled_date
                                ? new Date(v.scheduled_date).toLocaleDateString()
                                : "-"}
                            </td>
                            <td className={`status ${v.status.toLowerCase()}`}>
                              {v.status}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="loading">
                            Loading...
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(to bottom right, #f0f8ff, #ffffff)",
    minHeight: "100vh",
  },
};

export default VaccinationHistory;
