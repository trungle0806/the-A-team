import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useFavorites } from "../../Context/FavoritesContext"; // Correct import for accessing the context
import "./Header.css";

export const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Trạng thái đăng nhập
  const [isScrolled, setIsScrolled] = useState(false); // Theo dõi scroll
  const location = useLocation();
  const navigate = useNavigate();

  // Lấy danh sách yêu thích từ context
  const { favorites } = useFavorites(); // Correct usage of the custom hook

  // Kiểm tra token trong localStorage khi component mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      setIsAuthenticated(!!token);
    };

    checkAuth();

    const handleLoginStatusChange = () => checkAuth();

    window.addEventListener("loginStatusChanged", handleLoginStatusChange);
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("loginStatusChanged", handleLoginStatusChange);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  // Theo dõi trạng thái scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    navigate("/login");
  };

  // Xử lý chuyển hướng khi nhấn vào biểu tượng người dùng
  const handleUserClick = () => {
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const isHomePage = location.pathname === "/";
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  return (
    <div
      className={`header-container ${isScrolled ? "scrolled" : ""} ${
        !isHomePage && !isLoginPage && !isRegisterPage ? "other-page" : ""
      } ${isLoginPage || isRegisterPage ? "transparent" : ""}`}
    >
      {/* Logo */}
      <div className="logo-search-container">
        <div className="logo-header">
          <img
            src="https://www.charitynavigator.org/content/dam/cn/cn/logos/CharityNav_Logo_Hor1.png"
            alt="logo"
          />
        </div>
      </div>

      {/* Navigation Links */}
      <div className="navbar-header-link">
        <Link className="navbar-link" to="/">
          Home
        </Link>
        <Link className="navbar-link" to="/about">
          About
        </Link>
        <Link className="navbar-link" to="/contact">
          Contact
        </Link>
        <Link className="navbar-link" to="/news">
          News
        </Link>
        <Link className="navbar-link" to="/program">
          Program
        </Link>
      </div>

      {/* Auth and Favorites */}
      <div className="navbar-header-container3">
        {/* Favorites Icon */}
        <div className="favorites">
          <Link className="favorites-link" to="/favorites">
            <FontAwesomeIcon icon={faHeart} className="favorites-icon" />
            {favorites.length > 0 && (
              <span className="favorites-count">{favorites.length}</span>
            )}
          </Link>
        </div>

        {/* User Icon */}
        <div className="user-icon" onClick={handleUserClick}>
          <FontAwesomeIcon icon={faUser} className="user-icon-style" />
        </div>

        {/* Logout Icon (Only visible when authenticated) */}
        {isAuthenticated && (
          <div className="logout-icon" onClick={handleLogout}>
            <FontAwesomeIcon
              icon={faSignOutAlt}
              className="logout-icon-style"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
