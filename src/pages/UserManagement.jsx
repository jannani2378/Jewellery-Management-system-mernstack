import React, { useEffect, useState, useMemo } from "react";
import { FaTrash, FaEdit, FaFilter, FaFileExport, FaPlus } from "react-icons/fa";
import "./UserManagement.css";

/* localStorage key */
const STORAGE_KEY = "jsms_users_v1";

/* NEW: Screens list */
const SCREENS = [
  "Dashboard",
  "User Management",
  "Master Data",
  "Stock",
  "Orders & Advances",
  "Billing",
  "Expenses",
  "Reports",
  "Settings"
];

function loadInitialUsers() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {}
  }

  return [
    { id: 1, name: "Hari", phone: "8965432012", role: "Billing", date: "15 Jan 2025", access: [] },
    { id: 2, name: "David", phone: "7965435010", role: "Admin", date: "06 Jun 2024", access: SCREENS },
    { id: 3, name: "Jessica", phone: "9969432082", role: "Manager", date: "20 Jul 2025", access: [] },
  ];
}

export default function UserManagement() {
  const [users, setUsers] = useState(loadInitialUsers);
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  /* UPDATED form */
  const [form, setForm] = useState({
    name: "",
    phone: "",
    role: "",
    date: "",
    access: []
  });

  const [selectAll, setSelectAll] = useState(false);
  const [selected, setSelected] = useState({});
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({ role: "", dateFrom: "", dateTo: "" });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    setSelected((prev) => {
      const map = {};
      users.forEach((u) => {
        if (prev[u.id]) map[u.id] = true;
      });
      return map;
    });
  }, [users.length]);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const q = query.trim().toLowerCase();
      const matchQuery =
        q === "" ||
        u.name.toLowerCase().includes(q) ||
        u.phone.includes(q) ||
        u.role.toLowerCase().includes(q);

      const roleMatch =
        !filters.role ||
        u.role.toLowerCase() === filters.role.toLowerCase();

      return matchQuery && roleMatch;
    });
  }, [users, query, filters]);

  function openAdd() {
    setEditingUser(null);
    setForm({ name: "", phone: "", role: "", date: "", access: [] });
    setShowForm(true);
  }

  function openEdit(user) {
    setEditingUser(user);
    setForm({ ...user, access: user.access || [] });
    setShowForm(true);
  }

  function toggleAccess(screen) {
    if (form.access.includes(screen)) {
      setForm({ ...form, access: form.access.filter(s => s !== screen) });
    } else {
      setForm({ ...form, access: [...form.access, screen] });
    }
  }

  function saveForm() {
    if (!form.name.trim() || !form.phone.trim() || !form.role.trim() || !form.date.trim()) {
      alert("Please fill all fields.");
      return;
    }

    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id ? { ...u, ...form } : u
        )
      );
    } else {
      const id = Date.now();
      setUsers((prev) => [...prev, { id, ...form }]);
    }

    setShowForm(false);
    setEditingUser(null);
  }

  function confirmDelete(userId) {
    if (!window.confirm("Delete this user?")) return;
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  }

  function deleteSelected() {
    if (!window.confirm("Delete selected users?")) return;
    setUsers((prev) => prev.filter((u) => !selected[u.id]));
    setSelected({});
    setSelectAll(false);
  }

  function toggleSelectAll() {
    const newVal = !selectAll;
    setSelectAll(newVal);

    if (newVal) {
      const map = {};
      users.forEach((u) => (map[u.id] = true));
      setSelected(map);
    } else {
      setSelected({});
    }
  }

  function toggleSelect(id) {
    setSelected((prev) => {
      const copy = { ...prev };
      if (copy[id]) delete copy[id];
      else copy[id] = true;
      return copy;
    });
  }

  function exportCSV() {
    const header = ["User", "Phone No.", "Role", "Joined date"];
    const rows = users.map((u) => [u.name, u.phone, u.role, u.date]);

    const csv = [header, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users_export.csv";
    a.click();
  }

  function applyFilter() {
    setShowFilter(false);
  }

  function clearFilter() {
    setFilters({ role: "", dateFrom: "", dateTo: "" });
  }

  return (
    <div className="um-page">
      <div className="um-top">
        <h2>User Management</h2>

        <div className="um-controls">
          <div className="search-wrap">
            <input
              className="um-search"
              placeholder="Search by name, phone number or role"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <button className="btn small filter-btn" onClick={() => setShowFilter(true)}>
            <FaFilter /> Filter
          </button>

          <button className="btn small ghost" onClick={exportCSV}>
            <FaFileExport /> Export
          </button>

          <button className="btn primary" onClick={openAdd}>
            <FaPlus /> Add User
          </button>
        </div>
      </div>

      {/* TABLE unchanged */}
      <div className="um-table-wrap">
        <table className="um-table">
          <thead>
            <tr>
              <th><input type="checkbox" checked={selectAll} onChange={toggleSelectAll} /></th>
              <th>User</th>
              <th>Phone No.</th>
              <th>Role</th>
              <th>Joined date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((u) => (
              <tr key={u.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={!!selected[u.id]}
                    onChange={() => toggleSelect(u.id)}
                  />
                </td>
                <td>{u.name}</td>
                <td>{u.phone}</td>
                <td>{u.role}</td>
                <td>{u.date}</td>
                <td className="actions">
                  <button className="icon-btn" onClick={() => openEdit(u)}>
                    <FaEdit />
                  </button>
                  <button className="icon-btn danger" onClick={() => confirmDelete(u.id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD / EDIT MODAL */}
      {showForm && (
        <div className="um-modal">
          <div className="um-modal-box">
            <h3>{editingUser ? "Edit User" : "Add User"}</h3>

            <label>Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />

            <label>Phone</label>
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />

            {/* NEW: ROLE DROPDOWN */}
            <label>Role</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="">Select Role</option>
              <option>Admin</option>
              <option>Manager</option>
              <option>Billing</option>
            </select>

            <label>Joined date</label>
            <input
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              placeholder="DD MMM YYYY"
            />

            {/* NEW: SCREEN ACCESS */}
            <label>Screen Access</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              {SCREENS.map((screen) => (
                <label key={screen}>
                  <input
                    type="checkbox"
                    checked={form.access.includes(screen)}
                    onChange={() => toggleAccess(screen)}
                  />
                  {screen}
                </label>
              ))}
            </div>

            <div className="modal-actions">
              <button className="btn primary" onClick={saveForm}>
                {editingUser ? "Save" : "Add"}
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
