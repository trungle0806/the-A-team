import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import LoginWithGoogle from "./LoginWithGoogle/LoginWithGoogle";
import Header from "../Components/Header/Header";
import "./LoginForm.css";

const LoginForm = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = "http://localhost:5024/api/auth";

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNavigation = (role) => {
    if (role === "Admin") {
      navigate("/Admin", { state: { message: "Welcome Admin!" } });
    } else if (role === "User") {
      navigate("/", { state: { message: "Login successful! Welcome back!" } });
    } else if (role === "NGO") {
      navigate("/ngo", { state: { message: "Welcome NgoAdmin!" } });
    } else {
      console.error("Invalid role provided:", role);
    }
  };
  

  const loginRequest = async (emailOrUsername, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          EmailOrUsername: emailOrUsername,
          Password: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed.");
      }

      const data = await response.json();
      const { token } = data;

      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.Role;

      localStorage.setItem("authToken", token);
      localStorage.setItem("role", userRole);

      handleNavigation(userRole);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginSuccess = async (idToken) => {
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ IdToken: idToken }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Google login failed.");
      }

      const data = await response.json();
      const { token } = data;

      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.Role;

      // Lưu token vào localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("role", userRole);

      // Gửi sự kiện cập nhật giao diện
      window.dispatchEvent(new Event("loginStatusChanged"));

      handleNavigation(userRole);
    } catch (err) {
      setError("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(emailOrUsername)) {
      setError("Invalid email format.");
      return;
    }
    loginRequest(emailOrUsername, password);
  };

  return (
    <div className="body-login">
      <Header />
      <div className="form-container-login">
        {/* <img
        src="https://d20umu42aunjpx.cloudfront.net/_gfx_/main/CN_Logo_New2022.png"
        className="form-img"
        alt="Logo"
      />
      <h1 className="form-h1">Welcome</h1>
      <p className="form-p1">Login in to Charity Navigator to continue.</p> */}
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group-login">
            <label htmlFor="emailOrUsername" className="conten-login">
              Email or Username
            </label>
            <input
              type="text"
              id="emailOrUsername"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group-login">
            <label htmlFor="password" className="conten-login">
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
          <Link to="/forgot-password" className="login-link1">
            Forgot Password?
          </Link>
          <button type="submit" className="btn-submit-login" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="additional-links-login">
          <p className="login-link1-p">
            Don't have an account?
            <Link to="/register" className="login-link2">
              {" "}
              Register here.
            </Link>
          </p>
          <Link to="/" className="login-link3">
            Back to Home
          </Link>
        </div>
        <LoginWithGoogle onLoginSuccess={handleGoogleLoginSuccess} />
      </div>
    </div>
  );
};

export default LoginForm;
