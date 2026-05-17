import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { IPoolSummary } from "../types/PoolSummary";
import { useAuth } from "./AuthContext";
import { getMyPools } from "../services/PoolParticipantService";

interface PoolContextValue {
    pools: IPoolSummary[];
    activePool: IPoolSummary | null;
    isLoading: boolean;
    setActivePool: (pool: IPoolSummary) => void;
}

const ACTIVE_POOL_KEY = "app:activePool";
const PoolContext = createContext<PoolContextValue | null>(null);

export function PoolProvider({ children }: { children: ReactNode }) {
    const { auth } = useAuth();
    const [pools, setPools] = useState<IPoolSummary[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activePool, setActivePoolState] = useState<IPoolSummary | null>(() => {
        const stored = localStorage.getItem(ACTIVE_POOL_KEY);
        return stored ? JSON.parse(stored) : null;
    });

    const setActivePool = useCallback((pool: IPoolSummary) => {
        localStorage.setItem(ACTIVE_POOL_KEY, JSON.stringify(pool));
        setActivePoolState(pool);
    }, []);

    useEffect(() => {
        if (!auth) {
            setPools([]);
            setActivePoolState(null);
            localStorage.removeItem(ACTIVE_POOL_KEY);
            return;
        }

        setIsLoading(true);
        getMyPools()
            .then(data => {
                setPools(data);
                if (data.length === 1) setActivePool(data[0]); // auto-seleciona
            })
            .catch(() => setPools([]))
            .finally(() => setIsLoading(false));
    }, [auth?.token]);

    return (
        <PoolContext.Provider value={{ pools, activePool, isLoading, setActivePool }}>
            {children}
        </PoolContext.Provider>
    );
}

export function usePool(): PoolContextValue {
    const ctx = useContext(PoolContext);
    if (!ctx) throw new Error("usePool must be inside <PoolProvider>");
    return ctx;
}