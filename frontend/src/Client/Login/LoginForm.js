import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import AuthContext from "../../Context/AuthContext";
import LoginWithGoogle from "./LoginWithGoogle/LoginWithGoogle";
import "./LoginForm.css";

const LoginForm = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const API_URL = "http://localhost:5024/api/auth";

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
        console.error("Backend Error:", errorData);

        if (errorData.errors) {
          let errorMessage = "Validation errors:\n";
          if (typeof errorData.errors === "object") {
            Object.keys(errorData.errors).forEach((key) => {
              const errorArr = errorData.errors[key];
              if (Array.isArray(errorArr)) {
                errorArr.forEach((error) => {
                  errorMessage += `${key}: ${error}\n`;
                });
              } else {
                errorMessage += `${key}: ${errorArr}\n`;
              }
            });
          }
          setError(errorMessage);
        } else {
          setError(errorData.message || "Login failed.");
        }

        throw new Error(errorData.message || "Login failed.");
      }

      const data = await response.json();
      const { token } = data;

      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.Role;

      localStorage.setItem("token", token);
      localStorage.setItem("role", userRole);

      login(token, userRole);

      // Redirect to Home with a success message
      navigate("/", { state: { message: "Login successful! Welcome back!" } });
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginSuccess = async (idToken) => {
    console.log("Google Login Success. Token received:", idToken);
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

      localStorage.setItem("token", token);
      localStorage.setItem("role", userRole);

      login(token, userRole);
      navigate("/", { state: { message: "Login successful! Welcome back!" } });
    } catch (error) {
      console.error("Google login error:", error.message);
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
    <div className="form-container-login">
      <img
        src="https://d20umu42aunjpx.cloudfront.net/_gfx_/main/CN_Logo_New2022.png"
        className="form-img"
      />
      <h1 className="form-h1">Welcome</h1>
      <p className="form-p1">Login in to Charity Navigator to continue.</p>
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
  );
};

export default LoginForm;