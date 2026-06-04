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
    mustChangePassword: boolean;
    login: (token: string, role: string, user: string, mustChangePassword: boolean) => void;
    logout: () => void;
    clearMustChangePassword: () => void;
}

const KEYS = ["token", "role", "user", "app:activePool"];

const AuthContext = createContext<AuthContextValue | null>(null);

function loadFromStorage(): IAuthUser | null {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const user = localStorage.getItem("user");

    return token && role && user
        ? { token, role, user }
        : null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [auth, setAuth] = useState<IAuthUser | null>(loadFromStorage);
    const [mustChangePassword, setMustChangePassword] = useState(false);

    const login = useCallback(
        (token: string, role: string, user: string, mustChangePassword: boolean) => {
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            localStorage.setItem("user", user);

            setAuth({ token, role, user });
            setMustChangePassword(mustChangePassword);
        },
        []
    );

    const logout = useCallback(() => {
        KEYS.forEach(key => localStorage.removeItem(key));
        setAuth(null);
        setMustChangePassword(false);
    }, []);

    const clearMustChangePassword = useCallback(() => {
        setMustChangePassword(false);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                auth,
                mustChangePassword,
                login,
                logout,
                clearMustChangePassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);

    if (!ctx) {
        throw new Error("useAuth must be used inside <AuthProvider>");
    }

    return ctx;
}
