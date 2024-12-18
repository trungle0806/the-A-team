import React, { useState } from "react";
import axios from "axios";
import "./RegisterForm.css";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const API_URL = "http://localhost:5024/api/auth";

  // Kiểm tra email hợp lệ
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Kiểm tra mật khẩu hợp lệ
  const isPasswordValid = (password) => {
    const minLength = 8;
    const hasNumber = /\d/;
    const hasUpperCase = /[A-Z]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < minLength) {
      return "Password must be at least 8 characters.";
    }
    if (!hasNumber.test(password)) {
      return "Password must include at least one number.";
    }
    if (!hasUpperCase.test(password)) {
      return "Password must include at least one uppercase letter.";
    }
    if (!hasSpecialChar.test(password)) {
      return "Password must include at least one special character.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Kiểm tra các trường bắt buộc
    if (
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("All fields are required!");
      return;
    }

    // Kiểm tra email hợp lệ
    if (!isEmailValid(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Kiểm tra mật khẩu hợp lệ
    const passwordError = isPasswordValid(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    // Kiểm tra mật khẩu khớp
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      // Gửi dữ liệu đăng ký lên backend
      const response = await axios.post(`${API_URL}/register`, {
        firstName,
        lastName,
        dateOfBirth,
        email,
        password,
      });

      // Nếu thành công, hiển thị thông báo thành công và reset form
      setSuccess("Registration successful! You can now log in.");
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
      setSuccess("");
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-submit">
          Register
        </button>
      </form>

      <div className="additional-links">
        <Link to="/" className="home-link">
          Back to Home
        </Link>
        <Link to="/login" className="login-link">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
