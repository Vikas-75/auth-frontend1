import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ({ user, onLogout }) => {
  return (
    <div className="navbar">
      <div className="nav-left">
        <h2>EMS Portal</h2>
        <div className="nav-tabs">
          
          {/* Admin-only links */}
          {user?.roleType === "ADMIN" && (
            <>
              <Link to="/admin/employees" className="nav-tab">
                All Employee
              </Link>
              <Link to="/admin" className="nav-tab">
                Dashboard
              </Link>
            </>
          )}

          {/* Employee-only link */}
          {user?.roleType === "EMPLOYEE" && (
            <>
            <Link to="/leave-request" className="nav-tab">
              Leave Request
            </Link>
            <Link to="/home" className="nav-tab">
            Home
          </Link>
          <Link to="/about" className="nav-tab">
            About
          </Link>
          <Link to="/services" className="nav-tab">
            Services
          </Link>
          <Link to="/contact" className="nav-tab">
            Contact
          </Link>

            </>
          )}
        </div>
      </div>

      <div className="nav-right">
        <span className="role-badge">{user?.roleType}</span>
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
