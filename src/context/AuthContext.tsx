import {
    createContext,
    useContext,
    useState,
    useCallback,
    type ReactNode,
} from "react";
import type { IAuthUser } from "../types/Auth/AuthUserType";

interface AuthContextValue {
    auth: IAuthUser | null;
    login: (token: string, role: string, user: string) => void;
    logout: () => void;
}

const KEYS = ["token", "role", "user", "app:activePool"];
const AuthContext = createContext<AuthContextValue | null>(null);

function loadFromStorage(): IAuthUser | null {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const user = localStorage.getItem("user");
    return token && role && user ? { token, role, user } : null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [auth, setAuth] = useState<IAuthUser | null>(loadFromStorage);

    const login = useCallback((token: string, role: string, user: string) => {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("user", user);
        setAuth({ token, role, user });
    }, []);

    const logout = useCallback(() => {
        KEYS.forEach(k => localStorage.removeItem(k));
        setAuth(null);
    }, []);

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
    return ctx;
}