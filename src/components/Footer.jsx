import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} EMS Portal | All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
