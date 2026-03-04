import React, { useState } from "react";
import { FaPlus, FaEye, FaEdit } from "react-icons/fa";
import "./OrderManagement.css";

export default function OrderManagement() {
  const [orders, setOrders] = useState([
    {
      id: "ORD-2024-045",
      customer: "Rajesh Kumar",
      product: "Customise gold Ring",
      orderDate: "2024-05-10",
      dueDate: "2024-05-15",
      advance: 20000,
      status: "Pending",
    },
    {
      id: "ORD-2025-044",
      customer: "Priya Sharma",
      product: "Diamond Necklace",
      orderDate: "2025-06-08",
      dueDate: "2025-06-20",
      advance: 50000,
      status: "In Progress",
    },
  ]);

  const emptyForm = {
    customer: "",
    product: "",
    orderDate: "",
    dueDate: "",
    advance: "",
    status: "Pending",
  };

  const [form, setForm] = useState(emptyForm);
  const [showAdd, setShowAdd] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const countByStatus = (status) =>
    orders.filter((o) => o.status === status).length;

  /* ===== FILTER LOGIC ===== */
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchText.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchText.toLowerCase()) ||
      o.product.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" || o.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  /* ===== HANDLERS ===== */
  const openAdd = () => {
    setForm(emptyForm);
    setShowAdd(true);
  };

  const saveOrder = () => {
    if (!form.customer || !form.product) {
      alert("Customer and Product required");
      return;
    }

    const newId = `ORD-${new Date().getFullYear()}-${String(
      orders.length + 1
    ).padStart(3, "0")}`;

    setOrders([
      ...orders,
      {
        ...form,
        id: newId,
        advance: Number(form.advance),
      },
    ]);

    setShowAdd(false);
  };

  const updateOrder = () => {
    setOrders(
      orders.map((o) =>
        o.id === activeOrder.id ? { ...activeOrder, ...form } : o
      )
    );
    setShowEdit(false);
  };

  return (
    <div className="order-page">
      <h2>Order Management</h2>

      {/* STATUS CARDS */}
      <div className="order-status-grid">
        <StatusCard title="Pending" value={countByStatus("Pending")} color="orange" />
        <StatusCard title="In Progress" value={countByStatus("In Progress")} color="blue" />
        <StatusCard title="Completed" value={countByStatus("Completed")} color="green" />
        <StatusCard title="Overdue" value={countByStatus("Overdue")} color="red" />
      </div>

      {/* TABLE */}
      <div className="order-table-card">
        <div className="order-table-header">
          <h3>All Orders</h3>
          <div className="order-controls">
            <button className="btn primary" onClick={openAdd}>
              <FaPlus /> Create New Orders
            </button>

            <input
              placeholder="Search Orders"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Status</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>Overdue</option>
            </select>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Order Date</th>
              <th>Due Date</th>
              <th>Advance (₹)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: 20 }}>
                  No orders found
                </td>
              </tr>
            )}

            {filteredOrders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.customer}</td>
                <td>{o.product}</td>
                <td>{o.orderDate}</td>
                <td>{o.dueDate}</td>
                <td>{o.advance.toLocaleString("en-IN")}</td>
                <td>
                  <span
                    className={`status ${o.status
                      .replace(" ", "-")
                      .toLowerCase()}`}
                  >
                    {o.status}
                  </span>
                </td>
                <td className="actions">
                  <FaEye
                    onClick={() => {
                      setActiveOrder(o);
                      setShowView(true);
                    }}
                  />
                  <FaEdit
                    onClick={() => {
                      setActiveOrder(o);
                      setForm(o);
                      setShowEdit(true);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD MODAL */}
      {showAdd && (
        <Modal title="Create Order" onClose={() => setShowAdd(false)}>
          <div className="modal-form">
            <input
              placeholder="Customer"
              value={form.customer}
              onChange={(e) =>
                setForm({ ...form, customer: e.target.value })
              }
            />
            <input
              placeholder="Product"
              value={form.product}
              onChange={(e) =>
                setForm({ ...form, product: e.target.value })
              }
            />
            <input
              type="date"
              value={form.orderDate}
              onChange={(e) =>
                setForm({ ...form, orderDate: e.target.value })
              }
            />
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) =>
                setForm({ ...form, dueDate: e.target.value })
              }
            />
            <input
              placeholder="Advance"
              value={form.advance}
              onChange={(e) =>
                setForm({ ...form, advance: e.target.value })
              }
            />
            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>Overdue</option>
            </select>
          </div>

          <div className="modal-actions">
            <button className="btn primary" onClick={saveOrder}>
              Save
            </button>
          </div>
        </Modal>
      )}

      {/* VIEW MODAL */}
      {showView && activeOrder && (
        <Modal title="View Order" onClose={() => setShowView(false)}>
          <input value={activeOrder.id} readOnly />
          <input value={activeOrder.customer} readOnly />
          <input value={activeOrder.product} readOnly />
          <input value={activeOrder.orderDate} readOnly />
          <input value={activeOrder.dueDate} readOnly />
          <input value={activeOrder.advance} readOnly />
          <input value={activeOrder.status} readOnly />
        </Modal>
      )}

      {/* EDIT MODAL */}
      {showEdit && (
        <Modal title="Edit Order" onClose={() => setShowEdit(false)}>
          <div className="modal-form">
            <input
              value={form.customer}
              onChange={(e) =>
                setForm({ ...form, customer: e.target.value })
              }
            />
            <input
              value={form.product}
              onChange={(e) =>
                setForm({ ...form, product: e.target.value })
              }
            />
            <input
              type="date"
              value={form.orderDate}
              onChange={(e) =>
                setForm({ ...form, orderDate: e.target.value })
              }
            />
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) =>
                setForm({ ...form, dueDate: e.target.value })
              }
            />
            <input
              value={form.advance}
              onChange={(e) =>
                setForm({ ...form, advance: e.target.value })
              }
            />
            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>Overdue</option>
            </select>
          </div>

          <div className="modal-actions">
            <button className="btn primary" onClick={updateOrder}>
              Update
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* STATUS CARD */
function StatusCard({ title, value, color }) {
  return (
    <div className={`status-card ${color}`}>
      <p>{title}</p>
      <h2>{value}</h2>
    </div>
  );
}

/* MODAL */
function Modal({ title, children, onClose }) {
  return (
    <div className="order-modal">
      <div className="modal-box">
        <h3>{title}</h3>
        {children}
        <div className="modal-actions">
          <button className="btn ghost" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
