import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "./api";
import "./styles/EditEmployee.css";

const EditEmployee = () => {
  const { id } = useParams(); // get employee ID from URL
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    department: "",
    salary: "",
    roleType: "EMPLOYEE",
  });

  // Fetch employee details by ID
  const loadEmployee = async () => {
    try {
      const res = await API.get(`/admin/employees/${id}`);
      setEmployee(res.data);
    } catch (err) {
      alert("Failed to load employee data");
    }
  };

  // Update employee details
  const updateEmployee = async () => {
    try {
      await API.put(`/admin/employees/${id}`, employee);
      alert("Employee updated successfully");
      navigate("/admin/employees"); // redirect back to employee list
    } catch (err) {
      alert("Failed to update employee");
    }
  };

  useEffect(() => {
    loadEmployee();
  }, [id]);

  return (
    <div className="container">
      <h2>Edit Employee</h2>

      <div className="modal-content">
        <input
          placeholder="Name"
          value={employee.name}
          onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          value={employee.email}
          onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={employee.password}
          onChange={(e) =>
            setEmployee({ ...employee, password: e.target.value })
          }
        />

        <input
          placeholder="Job Role"
          value={employee.role}
          onChange={(e) => setEmployee({ ...employee, role: e.target.value })}
        />

        <input
          placeholder="Department"
          value={employee.department}
          onChange={(e) =>
            setEmployee({ ...employee, department: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Salary"
          value={employee.salary}
          onChange={(e) =>
            setEmployee({ ...employee, salary: e.target.value })
          }
        />

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
          <button className="approve" onClick={updateEmployee}>
            Save Changes
          </button>
          <button className="reject" onClick={() => navigate("/admin/employees")}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
