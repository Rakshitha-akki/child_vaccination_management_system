// src/App.js

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./component/Register";
import Login from "./component/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ParentDashboard from "./pages/Parent/ParentDashboard";
import Users from "./pages/Admin/Users";
import AddChild from "./pages/Admin/AddChild";
import AddSchedule from "./pages/Admin/AddSchedule";
import ViewChildren from "./pages/Admin/ViewChildren";
import VaccinationChart from "./pages/Admin/VaccinationChart";
import Home from "./component/Home"; // Corrected path
import SuccessMessage from "./pages/Admin/SuccessMessage";
import ScheduleList from "./pages/Admin/ScheduleList";
import ProviderDashboard from "./pages/Provider/ProviderDashboard";
import VaccinesPage from "./pages/Provider/VaccinesPage";
import ViewVaccines from "./pages/Admin/ViewVaccines";
import ParentAddChild from "./pages/Parent/AddChild";
import VaccinationHistory from "./pages/Parent/VaccinaationHistory";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent-dashboard"
          element={
            <ProtectedRoute>
              <ParentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/provider-dashboard"
          element={
            <ProtectedRoute>
              <ProviderDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/add-child"
          element={
            <ProtectedRoute>
              <ParentAddChild />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/vaccination-history"
          element={
            <ProtectedRoute>
              <VaccinationHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-child"
          element={
            <ProtectedRoute>
              <AddChild />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-child"
          element={
            <ProtectedRoute>
              <ViewChildren />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-schedule"
          element={
            <ProtectedRoute>
              <AddSchedule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/child/:childId/chart"
          element={
            <ProtectedRoute>
              <VaccinationChart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/success-message"
          element={
            <ProtectedRoute>
              <SuccessMessage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/schedule-list"
          element={
            <ProtectedRoute>
              <ScheduleList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/provider/vaccines"
          element={
            <ProtectedRoute>
              <VaccinesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/view-vaccines"
          element={
            <ProtectedRoute>
              <ViewVaccines />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;