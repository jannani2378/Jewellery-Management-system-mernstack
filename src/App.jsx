import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import UserManagement from "./pages/UserManagement.jsx";
import StockManagement from "./pages/StockManagement.jsx";
import OrderManagement from "./pages/OrderManagement.jsx";
import LoginPage from "./pages/LoginPage.jsx";

/* ✅ ADD THESE IMPORTS */
import Billing from "./pages/Billing.jsx";
import Reports from "./pages/Reports.jsx";

export default function App() {
  return (
    <Routes>
      {/* Login page */}
      <Route path="/" element={<LoginPage />} />

      {/* Pages inside layout */}
      <Route element={<Layout />}>

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/user-management" element={<UserManagement />} />

        <Route path="/stock" element={<StockManagement />} />

        <Route path="/orders" element={<OrderManagement />} />

        {/* ✅ NEW ROUTES ADDED */}
        <Route path="/billing" element={<Billing />} />

        <Route path="/reports" element={<Reports />} />

      </Route>
    </Routes>
  );
}