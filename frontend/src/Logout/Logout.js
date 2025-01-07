// Logout.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    if (onLogout) onLogout(); // Call the onLogout prop for additional logic if needed
    navigate("/login");
  };

  return (
    <div className="logout-icon" onClick={handleLogout}>
      <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon-style" />
    </div>
  );
};

export default Logout;
