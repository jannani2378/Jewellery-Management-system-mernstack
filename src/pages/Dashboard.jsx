import React from "react";
import {
  FiCalendar,
  FiShoppingCart,
  FiUsers,
  FiTrendingUp
} from "react-icons/fi";
import { MdInventory, MdPendingActions } from "react-icons/md";
import "./Dashboard.css";

const dashboardData = {
  todaysSale: {
    label: "Today's Sale",
    value: "₹ 45,800",
    meta: "6 bills today",
    icon: <FiTrendingUp />,
    color: "blue"
  },
  totalStockValue: {
    label: "Total Stock Value",
    value: "₹ 12,85,000",
    icon: <MdInventory />,
    color: "purple"
  },
  date: {
    label: "Date",
    value: new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }),
    icon: <FiCalendar />,
    color: "green"
  },
  goldRate: {
    label: "Gold Rate",
    value: "₹ 6,120 / gm",
    meta: "24K Gold",
    icon: <FiShoppingCart />,
    color: "gold"
  },
  pendingOrders: {
    label: "Pending Orders",
    value: "4",
    icon: <MdPendingActions />,
    color: "red"
  },
  totalCustomers: {
    label: "Total Customers",
    value: "326",
    icon: <FiUsers />,
    color: "teal"
  }
};

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>

    
    
      <div className="top-widgets">
        {Object.values(dashboardData).map((item, index) => (
          <DashboardBox key={index} data={item} />
        ))}
      </div>




      <div className="bottom-section">
        <div className="box large">
          <h4>Sales Overview</h4>
          <p className="placeholder">Chart will be rendered here</p>
        </div>

        <div className="box large">
          <h4>Stock Distribution</h4>
          <p className="placeholder">Gold / Silver / Diamond</p>
        </div>
      </div>
    </div>
  );
}

function DashboardBox({ data }) {
  return (
    <div className={`box accent-${data.color}`}>
      <div className="box-header">
        <div className={`icon ${data.color}`}>
          {data.icon}
        </div>
        <h4>{data.label}</h4>
      </div>

      <p className="value">{data.value}</p>
      {data.meta && <span>{data.meta}</span>}
    </div>
  );
}
