import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from './context/AuthContext.jsx'; // Add this

// ✅ Lazy-loaded Pages (ensure each has a default export)
const LandingPage = lazy(() => import("./Pages/LandingPage"));
const Mentors = lazy(() => import("./Pages/Mentors"));
const Assessment = lazy(() => import("./Pages/Assessment"));
const Auth = lazy(() => import("./Pages/Auth"));
const About = lazy(() => import("./Pages/About"));
const Profile = lazy(() => import("./Pages/Profile"));

// ✅ Shared Components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

// ✅ Global Styles
import "./styles/index.css";

// ✅ Loader Component
const Loader = () => (
  <div className="fixed inset-0 flex justify-center items-center bg-black/80 z-50 text-cyan-400 text-xl font-bold">
    Loading...
  </div>
);

// ✅ Layout Component
function Layout() {
  const location = useLocation();

  // Hide footer on specific routes
  const hideFooterRoutes = ["/assessment", "/mentors"];
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <div className="font-sans min-h-screen flex flex-col bg-black text-white">
      {/* Navbar always visible */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-grow relative">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route
              path="/assessment"
              element={
                <Assessment
                  userProfile={{
                    name: "Alice",
                    interests: "Web Development",
                    course: "Computer Science",
                  }}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="*"
              element={
                <div className="p-8 text-center text-red-400">
                  404 - Page Not Found
                </div>
              }
            />
          </Routes>
        </Suspense>
      </main>

      {/* Footer conditionally visible */}
      {!shouldHideFooter && <Footer />}
    </div>
  );
}

// ✅ Main App Component
function App() {
  return (
    <AuthProvider> {/* Wrap with AuthProvider */}
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
}

export default App;
