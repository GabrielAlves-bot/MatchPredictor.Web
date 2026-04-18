import { Outlet } from "react-router-dom";
import { BottomNav } from "../../components/BottomNav";
import { TopAppBar } from "../../components/TopAppBar";
import "./styles.css";

export function MasterPage() {
    return (
        <div className="master-page">
            <TopAppBar poolName="Copa do Mundo 2026" />
            <Outlet />
            <BottomNav />
        </div>
    );
}