import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import paths from "../routes/paths";

export function PrivateRouteGuard() {
  const { auth } = useAuth();
  return auth?.token ? <Outlet /> : <Navigate to={paths.login} replace />;
}