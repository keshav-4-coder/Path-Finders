import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "../styles/Auth.css";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
  const [message, setMessage] = useState("");
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      if (isLogin) {
        const response = await axios.post("http://127.0.0.1:8000/api/login/", {
          username: formData.email,
          password: formData.password,
        });
        setMessage(response.data.message);
        login(response.data.access, response.data.refresh, response.data.name);
        window.location.href = "/profile";
      } else {
        const response = await axios.post("http://127.0.0.1:8000/api/signup/", {
          username: formData.email,
          password: formData.password,
          name: formData.name,
        });
        setMessage(response.data.message);
        login(response.data.access, response.data.refresh, response.data.name);
        window.location.href = "/profile";
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "An error occurred");
      console.error("Error:", error);
    }
  };

  const handleForgotPassword = () => {
    alert("Redirecting to password reset flow...");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {isLogin && (
            <p className="forgot-password" onClick={handleForgotPassword}>
              Forgot Password?
            </p>
          )}
          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
          {message && <p style={{ color: message.includes("error") ? "red" : "green" }}>{message}</p>}
        </form>
        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Sign Up" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
}