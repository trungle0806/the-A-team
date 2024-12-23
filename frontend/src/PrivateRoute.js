import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./Context/AuthContext";

const PrivateRoute = ({ children, role }) => {
  const { auth } = useContext(AuthContext);

  if (!auth?.token) return <Navigate to="/login" />; // Ensure we check for auth.token, not just auth

  if (role && auth.role !== role) return <Navigate to="/" />;

  return children;
};

export default PrivateRoute;
