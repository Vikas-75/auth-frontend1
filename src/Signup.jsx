import React, { useState } from "react";
import API from "./api";
import "./styles/Auth.css";

const Signup = ({ onSignupSuccess, onLogin }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    department: "",
    salary: "",
    roleType: "EMPLOYEE",
  });

  const [errors, setErrors] = useState({}); // Store validation errors

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
  };

  // Validation function
  const validateForm = () => {
    let newErrors = {};

    // Name validation
    if (!form.name.trim()) newErrors.name = "Name is required";

    // Email validation
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    // Password validation
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Role validation
    if (!form.role.trim()) newErrors.role = "Job role is required";

    // Department validation
    if (!form.department.trim())
      newErrors.department = "Department is required";

    // Salary validation
    if (!form.salary) {
      newErrors.salary = "Salary is required";
    } else if (isNaN(form.salary) || Number(form.salary) <= 0) {
      newErrors.salary = "Salary must be a positive number";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSignup = async () => {
    if (!validateForm()) return; // Stop if validation fails

    try {
      await API.post("/employee/register", form);
      alert("Signup successful. Please login.");
      onSignupSuccess(); // switch to login page
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      {errors.name && <span className="error">{errors.name}</span>}

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      {errors.email && <span className="error">{errors.email}</span>}

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />
      {errors.password && <span className="error">{errors.password}</span>}

      <input
        name="role"
        placeholder="Job Role"
        value={form.role}
        onChange={handleChange}
      />
      {errors.role && <span className="error">{errors.role}</span>}

      <input
        name="department"
        placeholder="Department"
        value={form.department}
        onChange={handleChange}
      />
      {errors.department && <span className="error">{errors.department}</span>}

      <input
        name="salary"
        type="number"
        placeholder="Salary"
        value={form.salary}
        onChange={handleChange}
      />
      {errors.salary && <span className="error">{errors.salary}</span>}

      <select name="roleType" value={form.roleType} onChange={handleChange}>
        <option value="EMPLOYEE">Employee</option>
        <option value="ADMIN">Admin</option>
      </select>

      <button onClick={handleSignup}>Signup</button>

      <p className="signup-link">
        Already have an account? <span onClick={onLogin}>Login here</span>
      </p>
    </div>
  );
};

export default Signup;
