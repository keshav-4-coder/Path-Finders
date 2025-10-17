import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Users,
  Brain,
  Info,
  LogIn,
  UserCircle,
} from "lucide-react";
import "../styles/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef();

  // Close mobile menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <nav ref={navRef} className={`navbar ${menuOpen ? "active" : ""}`}>
      {/* Logo */}
      <div className="navbar-logo">
        
        <Link to="/"> <img src="/static/Logo.png" alt="Path-Finder Logo" className="logo" /></Link>
      </div>

      {/* Desktop Links */}
      <ul className="navbar-links">
        <li>
          <Link to="/">
            <Home size={18} /> Home
          </Link>
        </li>
        <li>
          <Link to="/assessment">
            <Brain size={18} /> AI Assessment
          </Link>
        </li>
        <li>
          <Link to="/mentors">
            <Users size={18} /> Mentors
          </Link>
        </li>
        <li>
          <Link to="/about">
            <Info size={18} /> About Us
          </Link>
        </li>
      </ul>

      {/* Desktop Actions */}
      <div className="navbar-actions">
        <Link to="/auth" className="btn btn-outline">
          <LogIn size={16} /> Login
        </Link>
        <Link to="/profile" className="btn btn-primary">
          <UserCircle size={16} /> My Profile
        </Link>
      </div>

      {/* Hamburger (Mobile Toggle) */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <Home size={18} /> Home
          </Link>
          <Link to="/assessment" onClick={() => setMenuOpen(false)}>
            <Brain size={18} /> AI Assessment
          </Link>
          <Link to="/mentors" onClick={() => setMenuOpen(false)}>
            <Users size={18} /> Mentors
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            <Info size={18} /> About Us
          </Link>
          <Link to="/auth" className="btn btn-outline" onClick={() => setMenuOpen(false)}>
            <LogIn size={16} /> Login
          </Link>
          <Link to="/profile" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
            <UserCircle size={16} /> My Profile
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
