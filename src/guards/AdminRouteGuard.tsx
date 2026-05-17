import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import paths from "../routes/paths";

export function AdminRouteGuard() {
    const { auth } = useAuth();

    if (!auth?.token) 
        return <Navigate to={paths.login} replace />;

    if (auth.role !== "Admin") 
        return <Navigate to={paths.predictions} replace />;

    return <Outlet />;
}