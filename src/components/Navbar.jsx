import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo77.png";
import "./Navbar.css"; // <-- add this line

const Navbar = () => (
  <nav className="navbar">
    <div className="logo-container">
      <img src={logo} alt="Healthcare Logo" className="logo"/>
    </div>
    <div className="nav-links">
      <Link to="/">Home</Link>
      <Link to="/checkup">Checkup</Link>
      <Link to="/records">Records</Link>
      <Link to="/consultation">Consultation</Link>
      <Link to="/admin">Admin</Link>
    </div>
  </nav>
);

export default Navbar;
