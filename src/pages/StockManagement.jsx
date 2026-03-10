import React, { useState, useMemo } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import "./StockManagement.css";

const LOW_STOCK_LIMIT = 2;

export default function StockManagement() {
  const [stocks, setStocks] = useState([
    {
      id: 1,
      product: "Gold Chain 22K",
      category: "Chains",
      huid: "GC2024001",
      grossWt: 25.5,
      netWt: 24.8,
      purity: 22.85,
      value: 155250,
      quantity: 5
    },
    {
      id: 2,
      product: "Bracelet",
      category: "Gold",
      huid: "2562656",
      grossWt: 155,
      netWt: 154,
      purity: 22.7,
      value: 1344622,
      quantity: 7
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingStock, setEditingStock] = useState(null);
  const [form, setForm] = useState({
    product: "",
    category: "",
    huid: "",
    grossWt: "",
    netWt: "",
    purity: "",
    value: "",
    quantity: ""
  });

  /* ===== CALCULATED TOTALS ===== */
  const totalItems = stocks.length;

  const totalWeight = useMemo(
    () => stocks.reduce((sum, s) => sum + Number(s.netWt), 0),
    [stocks]
  );

  const totalStockValue = useMemo(
    () => stocks.reduce((sum, s) => sum + Number(s.value), 0),
    [stocks]
  );

  const lowStock = useMemo(
    () => stocks.filter((s) => s.quantity <= LOW_STOCK_LIMIT).length,
    [stocks]
  );

  /* ===== FUNCTIONS ===== */
  function openAdd() {
    setEditingStock(null);
    setForm({
      product: "",
      category: "",
      huid: "",
      grossWt: "",
      netWt: "",
      purity: "",
      value: "",
      quantity: ""
    });
    setShowForm(true);
  }

  function openEdit(stock) {
    setEditingStock(stock);
    setForm(stock);
    setShowForm(true);
  }

  function saveStock() {
    if (!form.product || !form.huid) {
      alert("Product and HUID are required");
      return;
    }

    if (editingStock) {
      setStocks((prev) =>
        prev.map((s) => (s.id === editingStock.id ? { ...form, id: s.id } : s))
      );
    } else {
      setStocks((prev) => [...prev, { ...form, id: Date.now() }]);
    }

    setShowForm(false);
  }

  function deleteStock(id) {
    if (!window.confirm("Delete this stock item?")) return;
    setStocks((prev) => prev.filter((s) => s.id !== id));
  }

  /* ===== UI ===== */
  return (
    <div className="stock-page">
      {/* Header */}
      <div className="stock-header">
        <h2>Stock Management</h2>
        <button className="btn primary" onClick={openAdd}>
          <FaPlus /> Add New Stock
        </button>
      </div>

      {/* ===== SUMMARY SECTION ===== */}
      <div className="stock-summary-grid">
        <SummaryCard title="Total Items" value={totalItems} />
        <SummaryCard title="Total Weight (g)" value={totalWeight.toFixed(2)} />
        <SummaryCard
          title="Stock Value (₹)"
          value={totalStockValue.toLocaleString("en-IN")}
        />
        <SummaryCard
          title="Low Stock"
          value={lowStock}
          warning
        />
      </div>

      {/* ===== INVENTORY TABLE ===== */}
      <div className="stock-table-card">
        <h3>Stock Inventory</h3>

        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>HUID</th>
              <th>Gross WT</th>
              <th>Net WT</th>
              <th>Purity</th>
              <th>Value (₹)</th>
              <th>Qty</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {stocks.map((s) => (
              <tr key={s.id}>
                <td>{s.product}</td>
                <td>{s.category}</td>
                <td>{s.huid}</td>
                <td>{s.grossWt}</td>
                <td>{s.netWt}</td>
                <td>{s.purity}</td>
                <td>{Number(s.value).toLocaleString("en-IN")}</td>
                <td>{s.quantity}</td>
                <td className="actions">
                  <FaEdit onClick={() => openEdit(s)} />
                  <FaTrash onClick={() => deleteStock(s.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== ADD / EDIT MODAL ===== */}
      {showForm && (
        <div className="stock-modal">
          <div className="modal-box">
            <h3>{editingStock ? "Edit Stock" : "Add New Stock"}</h3>

            
            <div className="form-grid">

              <div className="form-group">
                <label>Product</label>
                <input
                  value={form.product}
                  onChange={(e)=>setForm({...form, product:e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <input
                  value={form.category}
                  onChange={(e)=>setForm({...form, category:e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>HUID</label>
                <input
                  value={form.huid}
                  onChange={(e)=>setForm({...form, huid:e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Gross Weight (g)</label>
                <input
                  value={form.grossWt}
                  onChange={(e)=>setForm({...form, grossWt:e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Net Weight (g)</label>
                <input
                  value={form.netWt}
                  onChange={(e)=>setForm({...form, netWt:e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Purity</label>
                <input
                  value={form.purity}
                  onChange={(e)=>setForm({...form, purity:e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Value (₹)</label>
                <input
                  value={form.value}
                  onChange={(e)=>setForm({...form, value:e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Quantity</label>
                <input
                  value={form.quantity}
                  onChange={(e)=>setForm({...form, quantity:e.target.value})}
                />
              </div>

            </div>
            <div className="modal-actions">
              <button className="btn primary" onClick={saveStock}>
                Save
              </button>
              <button className="btn ghost" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== SUMMARY CARD COMPONENT ===== */
function SummaryCard({ title, value, warning }) {
  return (
    <div className={`summary-card ${warning ? "warning" : ""}`}>
      <p className="summary-title">{title}</p>
      <h2 className="summary-value">{value}</h2>
      {warning && <span className="summary-hint">Needs attention</span>}
    </div>
  );
}
