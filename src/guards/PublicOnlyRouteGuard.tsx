import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import paths from "../routes/paths";

export function PublicOnlyRouteGuard() {
  const { auth } = useAuth();
  return auth?.token ? <Navigate to={paths.matches} replace /> : <Outlet />;
}