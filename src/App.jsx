import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Lazy-loaded Pages
const LandingPage = lazy(() => import("./Pages/LandingPage"));
const Mentors = lazy(() => import("./Pages/Mentors"));
const Assessment = lazy(() => import("./Pages/Assessment"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const Courses = lazy(() => import("./Pages/Courses"));
const Auth = lazy(() => import("./Pages/Auth"));

// Shared Components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

// Optional: Global CSS
import "./index.css";
import Profile from "./Pages/Profile";

// Loader component
const Loader = () => (
  <div className="fixed inset-0 flex justify-center items-center bg-black/70 z-50 text-cyan-400 text-xl font-bold">
    Loading...
  </div>
);

function App() {
  return (
    <Router>
      <div className="font-sans min-h-screen flex flex-col bg-black text-white">
        {/* Navbar always visible */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-grow relative">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<LandingPage />} ></Route>
              <Route path="/mentors" element={<Mentors />} ></Route>
              <Route path="/assessment" element={<Assessment />} ></Route>
              <Route path="/dashboard" element={<Dashboard />} ></Route>
              <Route path="/courses" element={<Courses />} ></Route>
              <Route path="/auth" element={<Auth />} ></Route>
              <Route path="/profile" element={<Profile  />} > </Route>
            </Routes>
          </Suspense>
        </main>

        {/* Footer always visible */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
