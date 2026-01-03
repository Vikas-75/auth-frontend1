import React, { useEffect, useState } from "react";
import API from "./api";
import "./styles/AdminPage.css";

const AdminPage = ({ onLogout }) => {
  const [pending, setPending] = useState([]);
  const [history, setHistory] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    department: "",
    salary: "",
    roleType: "EMPLOYEE",
  });

  const loadPending = async () => {
    const res = await API.get("/admin/leave/pending");
    setPending(res.data);
  };

  const loadHistory = async () => {
    const res = await API.get("/admin/leave/history");
    setHistory(res.data);
  };

  const approve = async (id) => {
    await API.put(`/admin/leave/${id}/approve`);
    loadPending();
    loadHistory();
  };

  const reject = async (id) => {
    await API.put(`/admin/leave/${id}/reject`);
    loadPending();
    loadHistory();
  };

  const addEmployee = async () => {
    try {
      await API.post("/admin/employees/add", employee);
      alert("Employee added successfully");
      setShowForm(false);
      setEmployee({
        name: "",
        email: "",
        password: "",
        role: "",
        department: "",
        salary: "",
        roleType: "EMPLOYEE",
      });
    } catch {
      alert("Failed to add employee");
    }
  };

  useEffect(() => {
    loadPending();
    loadHistory();
  }, []);

  return (
    <>
      {/* 🔹 Push content below fixed navbar */}
      <div className="navbar-spacer"></div>

      <div className="admin-page-container">
        {/* HEADER */}
        <div className="admin-header">
          <h2>Admin Leave Management</h2>
          <button
            className="add-employee-btn"
            onClick={() => setShowForm(true)}
          >
            Add Employee
          </button>
        </div>

        {/* ADD EMPLOYEE MODAL */}
        {showForm && (
          <div className="modal">
            <div className="modal-content">
              <h3>Add Employee</h3>

              <input placeholder="Name" value={employee.name}
                onChange={(e) => setEmployee({ ...employee, name: e.target.value })} />

              <input type="email" placeholder="Email" value={employee.email}
                onChange={(e) => setEmployee({ ...employee, email: e.target.value })} />

              <input type="password" placeholder="Password" value={employee.password}
                onChange={(e) => setEmployee({ ...employee, password: e.target.value })} />

              <input placeholder="Job Role" value={employee.role}
                onChange={(e) => setEmployee({ ...employee, role: e.target.value })} />

              <input placeholder="Department" value={employee.department}
                onChange={(e) => setEmployee({ ...employee, department: e.target.value })} />

              <input type="number" placeholder="Salary" value={employee.salary}
                onChange={(e) => setEmployee({ ...employee, salary: e.target.value })} />

              <select
                value={employee.roleType}
                onChange={(e) =>
                  setEmployee({ ...employee, roleType: e.target.value })
                }
              >
                <option value="EMPLOYEE">Employee</option>
                <option value="ADMIN">Admin</option>
              </select>

              <div className="modal-actions">
                <button className="approve" onClick={addEmployee}>Save</button>
                <button className="reject" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PENDING REQUESTS */}
        <h3>Pending Requests</h3>
        {pending.length === 0 && <p>No pending requests</p>}

        {pending.map((leave) => (
          <div key={leave.id} className="leave-card">
            <b>Employee ID:</b> {leave.employee.id}<br />
            <b>From:</b> {leave.startDate}<br />
            <b>To:</b> {leave.endDate}<br />
            <b>Reason:</b> {leave.description}<br />
            <b>Status:</b>{" "}
            <span className={`status ${leave.status}`}>{leave.status}</span>
            <br /><br />
            <button className="approve" onClick={() => approve(leave.id)}>
              Approve
            </button>
            <button className="reject" onClick={() => reject(leave.id)}>
              Reject
            </button>
          </div>
        ))}

        {/* HISTORY */}
        <h3>All Employees Leave History</h3>
        <table>
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Start</th>
              <th>End</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((leave) => (
              <tr key={leave.id}>
                <td>{leave.employee.id}</td>
                <td>{leave.startDate}</td>
                <td>{leave.endDate}</td>
                <td>{leave.description}</td>
                <td>
                  <span className={`status ${leave.status}`}>{leave.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminPage;
