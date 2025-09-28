import { useState } from "react";
import "./Dashboard.css";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <h2 className="sidebar-logo">StudentGuide</h2>
        <ul className="sidebar-links">
          <li
            className={activeTab === "overview" ? "active" : ""}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </li>
          <li
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => setActiveTab("profile")}
          >
            My Profile
          </li>
          <li
            className={activeTab === "courses" ? "active" : ""}
            onClick={() => setActiveTab("courses")}
          >
            Courses
          </li>
          <li
            className={activeTab === "resources" ? "active" : ""}
            onClick={() => setActiveTab("resources")}
          >
            Resources
          </li>
          <li
            className={activeTab === "settings" ? "active" : ""}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Dashboard
          </h1>
          <div className="user-info">
            <img
              src="https://i.pravatar.cc/100"
              alt="User"
              className="user-avatar"
            />
            <span className="username">John Doe</span>
          </div>
        </header>

        <section className="dashboard-content">
          {activeTab === "overview" && (
            <div className="cards-grid">
              <div className="card">
                <h3>Total Courses</h3>
                <p>6</p>
              </div>
              <div className="card">
                <h3>Completed</h3>
                <p>3</p>
              </div>
              <div className="card">
                <h3>Upcoming Tasks</h3>
                <p>4</p>
              </div>
              <div className="card">
                <h3>Resources Saved</h3>
                <p>12</p>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="card big-card">
              <h2>My Profile</h2>
              <p>Edit and update your profile details here.</p>
            </div>
          )}

          {activeTab === "courses" && (
            <div className="card big-card">
              <h2>My Courses</h2>
              <ul>
                <li>Web Development Basics</li>
                <li>Data Structures</li>
                <li>Artificial Intelligence</li>
              </ul>
            </div>
          )}

          {activeTab === "resources" && (
            <div className="card big-card">
              <h2>Resources</h2>
              <p>Access saved study materials, notes, and guides here.</p>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="card big-card">
              <h2>Settings</h2>
              <p>Manage your account preferences and app settings.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
