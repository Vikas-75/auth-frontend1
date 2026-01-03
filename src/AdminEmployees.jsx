import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";
import Layout from "./components/Layout";
import "./styles/AdminEmployees.css";

const AdminEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const loadEmployees = async () => {
    const res = await API.get("/admin/employees");
    setEmployees(res.data);
  };

  const deleteEmployee = async (id) => {
    if (window.confirm("Are you sure?")) {
      await API.delete(`/admin/employees/${id}`);
      loadEmployees();
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <Layout user={user} onLogout={() => navigate("/")}>
      <div className="page-header">
        <h2>Employees Management</h2>
        <button className="back-btn" onClick={() => navigate("/admin")}>
          ⬅ Back
        </button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.roleType}</td>
              <td>{emp.department}</td>
              <td>
                <button
                  className="danger"
                  onClick={() => deleteEmployee(emp.id)}
                >
                  Delete
                </button>
                <button
                  className="edit"
                  onClick={() =>
                    navigate(`/admin/employees/edit/${emp.id}`)
                  }
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default AdminEmployees;
