import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ScheduleList = () => {
  const [schedules, setSchedules] = useState([]);
  const [filter, setFilter] = useState({ date: "", month: "", year: "" });
  const [appliedFilter, setAppliedFilter] = useState({ date: "", month: "", year: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/schedules/all");
      setSchedules(res.data);
    } catch (err) {
      console.error("Error fetching schedules:", err);
    }
  };

  const markCompleted = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/schedules/mark-completed/${id}`);
      fetchSchedules();
    } catch (err) {
      console.error("Error marking as completed:", err);
    }
  };

  const deleteSchedule = async (id) => {
    if (window.confirm("Are you sure you want to delete this schedule?")) {
      try {
        const res = await axios.delete(`http://localhost:3000/api/schedules/delete/${id}`);
        console.log("Deleted:", res.data);
        fetchSchedules();
      } catch (err) {
        console.error("Error deleting schedule:", err);
      }
    }
  };
const sendReminder = async (reminderId) => {
  try {
    await axios.post(`http://localhost:3000/api/reminders/markReminderSent/${reminderId}`);
    window.alert("Sent reminder");
    fetchSchedules();
  } catch (err) {
    console.error("Error sending reminder:", err);
  }
};

  const createAndSendReminder = async (sch) => {
    try {
      const parentId = sch.child_id?.parent_id || sch.parent_id;
      if (!parentId || !sch.child_id?._id || !sch.vaccine_id?._id || !sch._id || !sch.scheduled_date) {
        alert("Missing required data for reminder!");
        return;
      }
      console.log({
        parent_id: parentId,
        child_id: sch.child_id._id,
        vaccine_id: sch.vaccine_id._id,
        schedule_id: sch._id,
        reminder_date: sch.scheduled_date,
      });
      const res = await axios.post("http://localhost:3000/api/reminders/create", {
        parent_id: parentId,
        child_id: sch.child_id._id,
        vaccine_id: sch.vaccine_id._id,
        schedule_id: sch._id,
        reminder_date: sch.scheduled_date,
      });
      await sendReminder(res.data._id);
    } catch (err) {
      console.error("Error creating or sending reminder:", err);
    }
  };

  const filteredSchedules = schedules.filter((sch) => {
    const date = new Date(sch.scheduled_date);
    const matchDate = appliedFilter.date ? date.toISOString().split("T")[0] === appliedFilter.date : true;
    const matchMonth = appliedFilter.month ? date.getMonth() + 1 === parseInt(appliedFilter.month) : true;
    const matchYear = appliedFilter.year ? date.getFullYear() === parseInt(appliedFilter.year) : true;
    return matchDate && matchMonth && matchYear;
  });

  return (
    <div style={containerStyle}>
      <button onClick={() => navigate("/admin-dashboard")} style={backBtnStyle}>
        ← Back to Dashboard
      </button>

      <h2 style={headingStyle}>Vaccination Schedules</h2>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <input
          type="date"
          value={filter.date}
          onChange={(e) => setFilter({ ...filter, date: e.target.value })}
        />
        <select
          value={filter.month}
          onChange={(e) => setFilter({ ...filter, month: e.target.value })}
        >
          <option value="">All Months</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
        <select
          value={filter.year}
          onChange={(e) => setFilter({ ...filter, year: e.target.value })}
        >
          <option value="">All Years</option>
          {[2023, 2024, 2025].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <button onClick={() => setAppliedFilter(filter)} style={applyBtn}>
          Apply Filter
        </button>
        <button
          onClick={() => {
            setFilter({ date: "", month: "", year: "" });
            setAppliedFilter({ date: "", month: "", year: "" });
          }}
          style={resetBtn}
        >
          Reset
        </button>
      </div>

      {filteredSchedules.length === 0 ? (
        <p style={{ textAlign: "center", fontWeight: "bold", color: "red", marginTop: "2rem" }}>
          No vaccination schedules found for the selected filter.
        </p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
              <th style={thStyle}>Child</th>
              <th style={thStyle}>Vaccine</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Reminder</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSchedules.map((sch) => (
              <tr key={sch._id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={tdStyle}>{sch.child_id?.name || "N/A"}</td>
                <td style={tdStyle}>{sch.vaccine_id?.vname || "N/A"}</td>
                <td style={tdStyle}>{new Date(sch.scheduled_date).toLocaleDateString()}</td>
                <td style={tdStyle}>
                  {sch.status === "Completed" ? (
                    <span style={{ color: "green", fontWeight: "bold" }}>✓ Completed</span>
                  ) : (
                    <span style={{ color: "orange", fontWeight: "bold" }}>⏳ Scheduled</span>
                  )}
                </td>
                <td style={tdStyle}>
                  {(sch.status === "Completed" || sch.reminder?.status === "Sent") ? (
                    <span style={{ color: "green", fontWeight: "bold" }}>✓ Sent</span>
                  ) : sch.reminder ? (
                    <button onClick={() => sendReminder(sch.reminder._id)} style={yellowBtn}>
                      Send Reminder
                    </button>
                  ) : (
                    <button onClick={() => createAndSendReminder(sch)} style={yellowBtn}>
                      Send Reminder
                    </button>
                  )}
                </td>
                <td style={tdStyle}>
                  {sch.status !== "Completed" && (
                    <button onClick={() => markCompleted(sch._id)} style={greenBtn}>
                      Mark Completed
                    </button>
                  )}
                  <button onClick={() => deleteSchedule(sch._id)} style={redBtn}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const containerStyle = {
  padding: "2rem",
  backgroundColor: "rgba(255, 255, 255, 0.85)",
  borderRadius: "12px",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
  margin: "2rem auto",
  maxWidth: "1200px",
  position: "relative",
};

const headingStyle = {
  textAlign: "center",
  marginBottom: "2rem",
  color: "#333",
};

const backBtnStyle = {
  position: "absolute",
  top: "20px",
  left: "20px",
  padding: "8px 16px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "rgba(255, 255, 255, 0.95)",
};

const thStyle = {
  padding: "12px",
  fontWeight: "bold",
  borderBottom: "2px solid #ccc",
};

const tdStyle = {
  padding: "12px",
  verticalAlign: "middle",
};

const redBtn = {
  backgroundColor: "#dc3545",
  color: "white",
  padding: "6px 12px",
  border: "none",
  borderRadius: "5px",
  marginLeft: "8px",
  cursor: "pointer",
};

const greenBtn = {
  backgroundColor: "#28a745",
  color: "white",
  padding: "6px 12px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const yellowBtn = {
  backgroundColor: "#ffc107",
  color: "black",
  padding: "6px 12px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const applyBtn = {
  padding: "8px 16px",
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const resetBtn = {
  padding: "8px 16px",
  backgroundColor: "#6c757d",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default ScheduleList;
