import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginRequest } from "../services/AuthService";
import type { ILoginRequest } from "../types/Auth/Requests/LoginRequest";

interface UseLoginReturn {
  isLoading: boolean;
  error: string | null;
  submit: (credentials: ILoginRequest) => Promise<void>;
}

export function useLogin(): UseLoginReturn {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(async (credentials: ILoginRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const { token, role, userName } = await loginRequest(credentials);
      login(token, role, userName);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setIsLoading(false);
    }
  }, [login, navigate]);

  return { isLoading, error, submit };
}
