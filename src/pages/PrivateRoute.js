import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    // If no token, redirect to SignIn
    return <Navigate to="/signin" />;
  }

  if (role && userRole !== role) {
    // If role does not match, redirect to the appropriate dashboard
    return <Navigate to={`/${userRole}-dashboard`} />;
  }

  return children; // If authenticated, return the protected route
};

export default PrivateRoute;
