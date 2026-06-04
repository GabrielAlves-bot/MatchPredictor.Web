import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import paths from "../routes/paths";

export function ChangePasswordGuard() {
    const { auth, mustChangePassword } = useAuth();

    if (!auth) {
        return <Navigate to={paths.login} replace />;
    }

    if (mustChangePassword) {
        return <Navigate to={paths.changePassword} replace />;
    }

    return <Outlet />;
}
