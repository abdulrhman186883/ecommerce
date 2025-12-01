import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import {useAuth} from "../context/Auth/Authcontext"

const AdminProtectedRoute: React.FC = () => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (role !== "admin") return <Navigate to="/" />;

  return <Outlet />;
};


export default AdminProtectedRoute;
