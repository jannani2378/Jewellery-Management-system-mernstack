import React, { useState } from "react";
import "./Reports.css";

/* ---------------- STOCK DATA ---------------- */

const stockData = [
  { category: "Rings", sub: "Gents Ring", qty: 45, gross: 850, net: 820, value: 125000 },
  { category: "Chains", sub: "Gold Chain", qty: 32, gross: 1200, net: 1180, value: 175000 },
  { category: "Bangles", sub: "Ladies Bangle", qty: 28, gross: 960, net: 940, value: 152000 },
  { category: "Earrings", sub: "Diamond Earring", qty: 56, gross: 420, net: 410, value: 95000 }
];

/* ---------------- SALES DATA ---------------- */

const salesData = [
  { bill: "INV001", date: "2024-01-20", customer: "Rajesh Kumar", items: 3, gross: 45, making: 8500, gst: 4200, total: 21500 },
  { bill: "INV002", date: "2024-01-20", customer: "Priya Sharma", items: 2, gross: 32, making: 6000, gst: 3100, total: 15800 },
  { bill: "INV003", date: "2024-01-19", customer: "Amit Patel", items: 1, gross: 18, making: 3500, gst: 1800, total: 9200 }
];

export default function Reports() {

  const [tab, setTab] = useState("stock");

  return (

    <div className="reports-page">

      <h2>Reports & Analytics</h2>

      {/* TABS */}

      <div className="report-tabs">

        <button
          className={tab === "stock" ? "active" : ""}
          onClick={() => setTab("stock")}
        >
          Stock
        </button>

        <button
          className={tab === "sales" ? "active" : ""}
          onClick={() => setTab("sales")}
        >
          Sales
        </button>

        <button
          className={tab === "gst" ? "active" : ""}
          onClick={() => setTab("gst")}
        >
          GST
        </button>

        <button
          className={tab === "cash" ? "active" : ""}
          onClick={() => setTab("cash")}
        >
          Cash & Gold
        </button>

      </div>

      {/* ---------------- STOCK TAB ---------------- */}

      {tab === "stock" && (

        <div className="report-layout">

          {/* FILTERS */}

          <div className="filters-card">

            <h3>Filters</h3>

            <label>Categories</label>
            <select>
              <option>All Categories</option>
              <option>Rings</option>
              <option>Chains</option>
              <option>Bangles</option>
            </select>

            <label>Supplier</label>
            <select>
              <option>All Suppliers</option>
              <option>Supplier A</option>
              <option>Supplier B</option>
            </select>

            <label>Date Range</label>
            <input type="date" />
            <input type="date" />

            <button className="apply-btn">
              Apply Filters
            </button>

          </div>

          {/* STOCK TABLE */}

          <div className="report-card">

            <h3>Stock Details</h3>

            <table>

              <thead>
                <tr>
                  <th>Category</th>
                  <th>Sub Category</th>
                  <th>Quantity</th>
                  <th>Gross Weight</th>
                  <th>Net Weight</th>
                  <th>Value</th>
                </tr>
              </thead>

              <tbody>

                {stockData.map((item, i) => (

                  <tr key={i}>

                    <td>{item.category}</td>
                    <td>{item.sub}</td>
                    <td>{item.qty}</td>
                    <td>{item.gross} g</td>
                    <td>{item.net} g</td>
                    <td>₹ {item.value.toLocaleString()}</td>

                  </tr>

                ))}

              </tbody>

            </table>

            <div className="export-buttons">

              <button className="btn primary">
                Export Excel
              </button>

              <button className="btn ghost">
                Export PDF
              </button>

            </div>

          </div>

        </div>
      )}

      {/* ---------------- SALES TAB ---------------- */}

      {tab === "sales" && (

        <div className="sales-card">

          <h3>Sales Transactions</h3>

          <table>

            <thead>

              <tr>
                <th>Bill No</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Gross Wt</th>
                <th>Making</th>
                <th>GST</th>
                <th>Total</th>
              </tr>

            </thead>

            <tbody>

              {salesData.map((sale, i) => (

                <tr key={i}>

                  <td>{sale.bill}</td>
                  <td>{sale.date}</td>
                  <td>{sale.customer}</td>
                  <td>{sale.items}</td>
                  <td>{sale.gross} g</td>
                  <td>₹ {sale.making}</td>
                  <td>₹ {sale.gst}</td>
                  <td>₹ {sale.total}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

      {/* ---------------- GST TAB ---------------- */}

      {tab === "gst" && (

        <div className="gst-summary">

          <div className="gst-card">
            <p>Total GST Collected</p>
            <h2>₹45,800</h2>
          </div>

          <div className="gst-card">
            <p>CGST</p>
            <h2>₹22,900</h2>
          </div>

          <div className="gst-card">
            <p>SGST</p>
            <h2>₹22,900</h2>
          </div>

          <div className="gst-card">
            <p>Taxable Amount</p>
            <h2>₹15.2L</h2>
          </div>

        </div>

      )}

      {/* ---------------- CASH & GOLD TAB ---------------- */}

      {tab === "cash" && (

        <div className="cash-layout">

          <div className="cash-card">

            <h3>Cash Box Summary</h3>

            <p>Opening Balance : ₹1,50,000</p>
            <p>Cash Inflow : ₹2,85,000</p>
            <p>Cash Outflow : ₹1,50,000</p>
            <p className="closing">Closing Balance : ₹2,85,000</p>

          </div>

          <div className="cash-card">

            <h3>Gold Box Summary</h3>

            <p>Opening Stock : 2850 g</p>
            <p>Gold Inflow : 1250 g</p>
            <p>Gold Outflow : 650 g</p>
            <p className="closing">Closing Stock : 3450 g</p>

          </div>

        </div>

      )}

    </div>

  );

}