import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Brain,
  BookOpen,
  LayoutDashboard,
  LogIn,
  UserCircle,
} from "lucide-react";
import "./Navbar.css";

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
        <Link to="/">🎓 Student Guide</Link>
      </div>

      {/* Desktop Links */}
      <ul className="navbar-links">
        <li>
          <Link to="/mentors">
            <Users size={18} /> Mentors
          </Link>
        </li>
        <li>
          <Link to="/assessment">
            <Brain size={18} /> AI Assessment
          </Link>
        </li>
        <li>
          <Link to="/courses">
            <BookOpen size={18} /> Courses
          </Link>
        </li>
        <li>
          <Link to="/dashboard">
            <LayoutDashboard size={18} /> Dashboard
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

      {/* Hamburger */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Mobile Menu */}
      <div className="mobile-menu">
        <Link to="/mentors">
          <Users size={18} /> Mentors
        </Link>
        <Link to="/assessment">
          <Brain size={18} /> AI Assessment
        </Link>
        <Link to="/courses">
          <BookOpen size={18} /> Courses
        </Link>
        <Link to="/dashboard">
          <LayoutDashboard size={18} /> Dashboard
        </Link>
        <Link to="/auth" className="btn btn-outline">
          <LogIn size={16} /> Login
        </Link>
        <Link to="/profile" className="btn btn-primary">
          <UserCircle size={16} /> My Profile
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
