import React, { useState } from "react";
import API from "./api";
import "./styles/Auth.css";

const Login = ({ onLogin, onSignup }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "EMPLOYEE", // default role
  });

  const [errors, setErrors] = useState({}); // store validation errors
  const [loading, setLoading] = useState(false); // loading state

  // 🔹 Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error when typing
  };

  // 🔹 Validate form before sending request
  const validateForm = () => {
    const newErrors = {};

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // no errors
  };

  // 🔹 Handle login request
  const handleLogin = async () => {
    if (!validateForm()) return; // stop if validation fails

    try {
      setLoading(true);
      const res = await API.post("/employee/login", {
        email: form.email,
        password: form.password,
        roleType: form.role,
      });

      // save login info locally
      localStorage.setItem("user", JSON.stringify(res.data));

      onLogin(res.data); // trigger parent login handler
    } catch (err) {
      setErrors({
        general: err.response?.data?.error || "Invalid email or password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

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

      <select name="role" value={form.role} onChange={handleChange}>
        <option value="EMPLOYEE">Employee</option>
        <option value="ADMIN">Admin</option>
      </select>

      {errors.general && <p className="error-msg">{errors.general}</p>}

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="signup-link">
        New User? <span onClick={onSignup}>Signup here</span>
      </p>
    </div>
  );
};

export default Login;
