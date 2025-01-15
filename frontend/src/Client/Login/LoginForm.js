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
  const [errorMessages, setErrorMessages] = useState({});
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
        let errorMessage = "Login failed.";

        try {
          // Kiểm tra nếu response trả về là JSON
          const errorData = await response.json();
          errorMessage = errorData.message || "Login failed.";
        } catch (e) {
          // Nếu không phải JSON, sử dụng thông báo mặc định
          errorMessage =
            "Your password is incorrect. Please re-enter your password to log in!";
        }

        setError(errorMessage);
        return;
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

      localStorage.setItem("authToken", token);
      localStorage.setItem("role", userRole);

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
    let errors = {};

    // Kiểm tra nếu email hoặc username trống
    if (!emailOrUsername) {
      errors.emailOrUsername = "Please enter email or username!";
    } else if (!isValidEmail(emailOrUsername)) {
      errors.emailOrUsername = "Your email is not in the correct format!";
    }

    // Kiểm tra nếu mật khẩu trống
    if (!password) {
      errors.password = "Please enter your password!";
    }

    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    }

    // Nếu không có lỗi, thực hiện yêu cầu đăng nhập
    setErrorMessages({});
    loginRequest(emailOrUsername, password);
  };

  return (
    <div className="body-login">
      <Header />
      <div className="form-container-login">
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
              className={errorMessages.emailOrUsername ? "input-error" : ""}
              placeholder="Enter your email or username"
            />
            {errorMessages.emailOrUsername && (
              <small className="error-text">
                {errorMessages.emailOrUsername}
              </small>
            )}
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
              className={errorMessages.password ? "input-error" : ""}
              placeholder="Enter your password"
            />
            {errorMessages.password && (
              <small className="error-text">{errorMessages.password}</small>
            )}
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
