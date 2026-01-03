import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import EmployeePage from "./EmployeePage";
import AdminPage from "./AdminPage";
import AdminEmployees from "./AdminEmployees";
import EditEmployee from "./EditEmployee";

import HomePage from "./HomePage";
import About from "./About";
import Services from "./Services";
import Contact from "./Contact";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogin = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      {/* 🔹 Navbar */}
      {user && <Navbar user={user} onLogout={handleLogout} />}

      {/* 🔹 Page Content */}
      <div className="app-content">
        <Routes>
          {/* Login / Signup */}
          <Route
            path="/"
            element={
              !user ? (
                showSignup ? (
                  <Signup
                    onSignupSuccess={() => setShowSignup(false)}
                    onLogin={() => setShowSignup(false)}
                  />
                ) : (
                  <Login
                    onLogin={handleLogin}
                    onSignup={() => setShowSignup(true)}
                  />
                )
              ) : user.roleType === "ADMIN" ? (
                <Navigate to="/admin" />
              ) : (
                <Navigate to="/employee" />
              )
            }
          />

          {/* Public Pages */}
          <Route
            path="/home"
            element={user ? <HomePage user={user} /> : <Navigate to="/" />}
          />
          <Route
            path="/about"
            element={user ? <About /> : <Navigate to="/" />}
          />
          <Route
            path="/services"
            element={user ? <Services /> : <Navigate to="/" />}
          />
          <Route
            path="/contact"
            element={user ? <Contact /> : <Navigate to="/" />}
          />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="ADMIN">
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/employees"
            element={
              <ProtectedRoute role="ADMIN">
                <AdminEmployees />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/employees/edit/:id"
            element={
              <ProtectedRoute role="ADMIN">
                <EditEmployee />
              </ProtectedRoute>
            }
          />

          {/* Employee */}
          <Route
            path="/employee"
            element={
              <ProtectedRoute role="EMPLOYEE">
                <EmployeePage />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

      {/* 🔹 Footer */}
      <Footer />
    </Router>
  );
}

export default App;
