import { Outlet } from "react-router-dom";
import { BottomNav } from "../../components/BottomNav";
import { TopAppBar } from "../../components/TopAppBar";
import "./styles.css";

interface IProps {
    poolName: string
}

export function MasterPage({ poolName }: IProps) {
    return (
        <div className="master-page">
            <TopAppBar poolName={poolName} />
            <Outlet />
            <BottomNav />
        </div>
    );
}