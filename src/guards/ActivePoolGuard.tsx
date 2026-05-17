import { Navigate, Outlet } from "react-router-dom";
import { usePool } from "../context/PoolContext";
import paths from "../routes/paths";

export function ActivePoolGuard() {
    const { activePool, isLoading } = usePool();

    if (isLoading) return null; // ou um spinner

    return activePool
        ? <Outlet />
        : <Navigate to={paths.selectPool} replace />;
}