import React, { useState, useEffect } from "react";
import API from "./api";
import "./styles/EmployeePage.css";

const EmployeePage = () => {
  const [empId, setEmpId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id) {
      setEmpId(user.id);
      fetchMyLeaves(user.id);
    }
  }, []);

  const applyLeave = async () => {
    try {
      await API.post(`/employee/leave/apply/${empId}`, {
        startDate,
        endDate,
        description,
        status: "PENDING",
      });
      alert("Leave applied successfully");
      fetchMyLeaves(empId);
    } catch {
      alert("Error applying leave");
    }
  };

  const fetchMyLeaves = async (id = empId) => {
    try {
      const res = await API.get(`/employee/leave/my/${id}`);
      setLeaves(res.data);
    } catch {
      alert("Error fetching leaves");
    }
  };

  return (
    <>
      {/* Spacer pushes content below navbar */}
      <div className="navbar-spacer"></div>

      <div className="employee-page-container">
        <h2>Employee Leave Management</h2>

        {/* Employee ID */}
        <div className="form-group">
          <label>Employee ID</label>
          <input type="number" value={empId} disabled />
        </div>

        <h3>Apply for Leave</h3>

        {/* Start Date */}
        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        {/* End Date */}
        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Leave Description</label>
          <textarea
            placeholder="Enter reason for leave"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button onClick={applyLeave}>Apply Leave</button>

        <h3>My Leave Requests</h3>

        <table>
          <thead>
            <tr>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave.id}>
                <td>{leave.startDate}</td>
                <td>{leave.endDate}</td>
                <td>{leave.description}</td>
                <td className={`status ${leave.status}`}>
                  {leave.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeePage;
