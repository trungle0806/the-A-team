import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

export const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Trạng thái đăng nhập
  const [isScrolled, setIsScrolled] = useState(false); // Theo dõi scroll
  const location = useLocation();
  const navigate = useNavigate();

  // Kiểm tra token trong localStorage khi component mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken"); // Kiểm tra token trong localStorage
      console.log("Checking auth token:", token); // Kiểm tra token trong console
      setIsAuthenticated(!!token); // Cập nhật trạng thái nếu token tồn tại
    };

    checkAuth(); // Kiểm tra ngay khi component mount

    // Lắng nghe sự kiện đăng nhập/đăng xuất (bao gồm cả login bằng Google)
    const handleLoginStatusChange = () => {
      console.log("Login status changed");
      checkAuth();
    };

    window.addEventListener("loginStatusChanged", handleLoginStatusChange);
    window.addEventListener("storage", checkAuth); // Đồng bộ giữa các tab

    return () => {
      window.removeEventListener("loginStatusChanged", handleLoginStatusChange);
      window.removeEventListener("storage", checkAuth); // Dọn dẹp
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
    console.log("Logging out...");
    localStorage.removeItem("authToken"); // Xóa token khỏi localStorage
    localStorage.removeItem("role"); // Xóa role khỏi localStorage
    setIsAuthenticated(false); // Đặt lại trạng thái đăng nhập
    navigate("/login"); // Điều hướng về trang đăng nhập
  };

  // Xử lý chuyển hướng khi nhấn vào biểu tượng người dùng
  const handleUserClick = () => {
    if (isAuthenticated) {
      navigate("/profile"); // Điều hướng đến trang profile nếu đã đăng nhập
    } else {
      navigate("/login"); // Điều hướng đến trang đăng nhập nếu chưa đăng nhập
    }
  };

  const isHomePage = location.pathname === "/";

  return (
    <div
      className={`header-container ${isScrolled ? "scrolled" : ""} ${
        !isHomePage ? "other-page" : ""
      }`}
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
        <div>
          <Link className="navbar-link" to="/">
            Home
          </Link>
        </div>
        <div>
          <Link className="navbar-link" to="/about">
            About
          </Link>
        </div>
        <div>
          <Link className="navbar-link" to="/contact">
            Contact
          </Link>
        </div>
        <div>
          <Link className="navbar-link" to="/news">
            News
          </Link>
        </div>
      </div>

      {/* Auth and Cart */}
      <div className="navbar-header-container3">
        {/* Cart Icon */}
        <div className="cart">
          <Link className="cart-link" to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
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
