import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Không cần destructure
import AuthContext from "../../Context/AuthContext";
import LoginWithFacebook from './LoginWithFacebook/LoginWithFacebook';
import "./LoginForm.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const API_URL = "https://shopy-emahgphwbhgpd3bs.japanwest-01.azurewebsites.net/api/auth/login";

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const loginRequest = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed. Please try again.");
      }

      const data = await response.json();
      const { token } = data;

      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.Role;

      localStorage.setItem("token", token);
      localStorage.setItem("role", userRole);

      login(token, userRole);
      navigate(userRole === "Admin" ? "/admin/dashboard" : "/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Invalid email format.");
      return;
    }
    loginRequest(email, password);
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="email" className="email-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="password-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="additional-links">
      <LoginWithFacebook />
        <Link to="/forgot-password" className="forgot-password-link">
          Forgot Password?
        </Link>
        <Link to="/register" className="register-link">
          Don't have an account? Register here.
        </Link>
        <Link to="/" className="home-link">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;