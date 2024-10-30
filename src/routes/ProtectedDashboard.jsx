import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedDashboard = ({ children }) => {
  const { ejarakLogin, userData } = useSelector((state) => state.authSlice);
  const role = userData?.account?.type;
  console.log("role", role);

  if (!ejarakLogin) {
    return <Navigate to="/auth/login" />;
  }

  if (
    role !== "super_admin" &&
    role !== "admin" &&
    role !== "customer_service"
  ) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedDashboard;
