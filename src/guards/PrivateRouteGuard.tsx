import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function PrivateRouteGuard() {
  const { auth } = useAuth();
  return auth?.token ? <Outlet /> : <Navigate to="/login" replace />;
}