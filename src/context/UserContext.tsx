import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode
} from "react";

import type { IUserProfile } from "../types/UserProfile";
import { useAuth } from "./AuthContext";
import { getMe } from "../services/UserService";

interface UserContextValue {
    profile: IUserProfile | null;
    isLoading: boolean;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
    const { auth } = useAuth();

    const [profile, setProfile] = useState<IUserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchUser() {
            try {
                if (!auth?.token) {
                    setProfile(null);
                    return;
                }

                setIsLoading(true);

                const userResponse = await getMe();

                setProfile(userResponse);
            } catch (error) {
                console.error("Erro ao buscar usuário:", error);
                setProfile(null);
            } finally {
                setIsLoading(false);
            }
        }

        fetchUser();
    }, [auth?.token]);

    return (
        <UserContext.Provider value={{ profile, isLoading }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser(): UserContextValue {
    const ctx = useContext(UserContext);

    if (!ctx) {
        throw new Error("useUser must be inside <UserProvider>");
    }

    return ctx;
}