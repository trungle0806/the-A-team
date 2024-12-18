import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { FaRegTimesCircle } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";

import "./Authentication.css";

function Authentication() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility
  const [isRightMenuOpen, setIsRightMenuOpen] = useState(false); // State for right menu

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Toggle right menu visibility
  const toggleRightMenu = () => {
    setIsRightMenuOpen(!isRightMenuOpen);
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="logo">
          <a className="admin-dark">
            <img
              src="https://modernize-nextjs.adminmart.com/images/logos/dark-logo.svg"
              className="admin-light"
              alt="Logo"
            />
          </a>
        </div>
        <nav className="admin-nav">
          <ul>
            <li>
              <Link to="dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="customers">Customers</Link>
            </li>
            <li>
              <Link to="product">Product</Link>
            </li>
            <li>
              <Link to="order">Order</Link>
            </li>
            <li>
              <Link to="inventory">Inventory</Link>
            </li>
            <li>
              <Link to="news">News</Link>
            </li>
            <li>
              <Link to="users">Users</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Top Navigation */}
        <nav className="admin-vs">
          <div className="admin-right">
            <div className="admin-isolate">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-input"
                />
                <button className="search-btn">
                  <IoSearch />
                </button>
              </div>
            </div>

            {/* Gmail Icon */}
            <div className="icon gmail-icon">
              <MdOutlineEmail />
            </div>

            {/* Notification Icon */}
            <div className="icon notification-icon">
              <IoMdNotificationsOutline />
            </div>

            {/* User Info */}
            <div className="user-info">
              <img
                src="https://via.placeholder.com/40"
                alt="User Avatar"
                className="user-avatar"
                />
              <span className="user-name">John Doe</span>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        <div className="admin-inhud">
          <button className="admin-icon" onClick={toggleSidebar}>
            <IoMenu />
          </button>

          <div className="logo1">
            <a className="admin-dark1">
              <img
                src="https://modernize-nextjs.adminmart.com/images/logos/dark-logo.svg"
                className="admin-light"
                alt="Logo"
              />
            </a>
          </div>

          <button className="admin-icon1" onClick={toggleRightMenu}>
            <BsThreeDotsVertical />
          </button>
        </div>

        {/* Sidebar for mobile */}
        <div
          className={`admin-overlay ${isSidebarOpen ? "show" : ""}`}
          onClick={toggleSidebar}
        ></div>
        <nav className={`admin-mobile ${isSidebarOpen ? "open" : ""}`}>
          <div className="admin-mobile-close" onClick={toggleSidebar}>
            <FaRegTimesCircle />
          </div>
          <ul className="admin-mobile-link">
            <li>
              <Link to="dashboard" className="admin-mobile-list">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="customers" className="admin-mobile-list">
                Customers
              </Link>
            </li>
            <li>
              <Link to="product" className="admin-mobile-list">
                Product
              </Link>
            </li>
            <li>
              <Link to="order" className="admin-mobile-list">
                Order
              </Link>
            </li>
            <li>
              <Link to="inventory" className="admin-mobile-list">
                Inventory
              </Link>
            </li>
            <li>
              <Link to="news" className="admin-mobile-list">
                News
              </Link>
            </li>
            <li>
              <Link to="users" className="admin-mobile-list">
                Users
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right-side menu */}
        <div
          className={`admin-overlay1 ${isRightMenuOpen ? "show" : ""}`}
          onClick={toggleRightMenu}
        ></div>
        <div className={`admin-mobile1 ${isRightMenuOpen ? "open" : ""}`}>
          <div className="admin-mobile-close" onClick={toggleRightMenu}>
            <FaRegTimesCircle />
          </div>
          <div className="admin-toin">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
              />
              <button className="search-btn">
                <IoSearch />
              </button>
            </div>
            <div className="icon gmail-icon">Gmail</div>
            <div className="icon notification-icon">Notification</div>
            <div className="user-info">
              <img
                src="https://via.placeholder.com/40"
                alt="User Avatar"
                className="user-avatar"
              />
              <span className="user-name">John Doe</span>
            </div>
          </div>
        </div>

        {/* Outlet for nested routes */}
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Authentication;