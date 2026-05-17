import { usePool } from "../../context/PoolContext";
import { MasterPage } from "../../pages/MasterPage/index.";

export function MasterPageWrapper() {
    const { activePool, isLoading } = usePool();

    if (isLoading) return null; // ou um spinner

    return <MasterPage poolName={activePool?.poolName ?? ""} />;
}