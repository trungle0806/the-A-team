import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

export const Header = () => {
  const [activeLink, setActiveLink] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Đăng nhập
  const navigate = useNavigate(); // Điều hướng

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const handleSearch = () => {
    console.log("Search for:", searchQuery);
  };

  const handleUserClick = () => {
    navigate("/login");
  };

  return (
    <div className="header-container">
      {/* Logo */}
      <div className="logo-search-container">
        <div className="logo-header">
          <img src="https://www.charitynavigator.org/content/dam/cn/cn/logos/CharityNav_Logo_Hor1.png" alt="logo"/>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="navbar-header-link">
        <div
          className={`navbar-header-home ${
            activeLink === "home" ? "active" : ""
          }`}
          onClick={() => handleLinkClick("home")}
        >
          <Link to="/">Home</Link>
        </div>
        {/* <div
          className={`navbar-header-product ${
            activeLink === "productclient" ? "active" : ""
          }`}
          onClick={() => handleLinkClick("productclient")}
        >
          <Link to="/productclient">Product</Link>
        </div> */}
        <div
          className={`navbar-header-about ${
            activeLink === "about" ? "active" : ""
          }`}
          onClick={() => handleLinkClick("about")}
        >
          <Link to="/about">About</Link>
        </div>
        <div
          className={`navbar-header-contact ${
            activeLink === "contact" ? "active" : ""
          }`}
          onClick={() => handleLinkClick("contact")}
        >
          <Link to="/contact">Contact</Link>
        </div>
        <div
          className={`navbar-header-news ${
            activeLink === "news" ? "active" : ""
          }`}
          onClick={() => handleLinkClick("news")}
        >
          <Link to="/news">News</Link>
        </div>
      </div>

      {/* Auth and Cart */}
      <div className="navbar-header-container3">
        {/* Cart Icon */}
        <div className="cart">
          <Link to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
          </Link>
        </div>

        {/* User Icon */}
        <div className="user-icon" onClick={handleUserClick}>
          <FontAwesomeIcon icon={faUser} className="user-icon-style" />
        </div>
      </div>
    </div>
  );
};

export default Header;
