import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  adminOnly?: boolean; // Para proteger rutas que solo el admin puede ver
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  adminOnly = false,
}) => {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "1";

  // 1. Si no hay token, al login de cabeza
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2. Si la ruta es solo para admin y no lo es, al dashboard normal
  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // 3. Si todo está ok, renderiza los componentes hijos (Outlet)
  return <Outlet />;
};

export default ProtectedRoute;
