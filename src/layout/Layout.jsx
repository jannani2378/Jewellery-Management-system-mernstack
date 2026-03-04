import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./Layout.css";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="layout-container">
      <aside className="sidebar">
        <div className="logo">IBT</div>

        <ul className="menu">
          <li className={location.pathname === "/dashboard" ? "active" : ""}>
            <Link to="/dashboard">Dashboard</Link>
          </li>

          <li className={location.pathname === "/user-management" ? "active" : ""}>
            <Link to="/user-management">User Management</Link>
          </li>

          <li><Link to="#">Master Data</Link></li>

          <li className={location.pathname === "/stock" ? "active" : ""}>
            <Link to="/stock">Stock</Link>
          </li>

          <li className={location.pathname === "/orders" ? "active" : ""}>
            <Link to="/orders">Orders & Advances</Link>
          </li>
                <li className={location.pathname === "/billing" ? "active" : ""}>
            <Link to="/billing">Billing</Link>
          </li>

          <li><Link to="#">Expenses</Link></li>

          <li className={location.pathname === "/reports" ? "active" : ""}>
            <Link to="/reports">Reports</Link>
          </li>

          <li><Link to="#">Settings</Link></li>
        </ul>

        <div className="admin-box">Admin User</div>
      </aside>

      <main className="main-content">

        {/* ✅ GOLD TICKER ADDED HERE */}
        <div className="gold-ticker">
          <div className="gold-ticker-track">
            💰 Gold 24K: ₹6,120/gm • Gold 22K: ₹5,610/gm • 
            Yesterday: ₹6,080/gm • Weekly High: ₹6,150/gm • 
            IBT Live Gold Rate •
            
            💰 Gold 24K: ₹6,120/gm • Gold 22K: ₹5,610/gm • 
            Yesterday: ₹6,080/gm • Weekly High: ₹6,150/gm •
          </div>
        </div>

        <Outlet />

      </main>
    </div>
  );
}
