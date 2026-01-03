// src/components/Layout.jsx
import React from "react";
import Navbar from "./Navbar";
import "../styles/layout.css";

const Layout = ({ children, user, onLogout }) => {
  return (
    <div className="app-container">
      <Navbar user={user} onLogout={onLogout} />

      <div className="main-content">
        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
