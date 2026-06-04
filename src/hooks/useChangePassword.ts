import { useState, useCallback } from "react";
import { changePasswordRequest } from "../services/AuthService";

interface PasswordChecks {
    hasMinLength: boolean;
    hasUpperCase: boolean;
    hasNumberOrSymbol: boolean;
}

function getChecks(password: string): PasswordChecks {
    return {
        hasMinLength: password.length >= 8,
        hasUpperCase: /[A-Z]/.test(password),
        hasNumberOrSymbol: /[0-9!@#$%^&*]/.test(password),
    };
}

function getStrength(password: string): number {
    if (!password) return 0;
    const checks = getChecks(password);
    const passed = Object.values(checks).filter(Boolean).length;
    if (password.length < 4) return 1;
    if (passed === 1) return 1;
    if (passed === 2) return 2;
    if (passed === 3 && password.length >= 12) return 4;
    return 3;
}

export function useChangePassword(currentPassword: string) {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const checks = getChecks(newPassword);
    const strength = getStrength(newPassword);
    const isValid =
        checks.hasMinLength &&
        checks.hasUpperCase &&
        checks.hasNumberOrSymbol &&
        newPassword === confirmPassword;

    const submit = useCallback(async () => {
        if (!isValid) return;

        setIsLoading(true);
        setError(null);

        try {
            await changePasswordRequest({
                currentPassword,
                newPassword,
            });
            setSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao alterar senha.");
        } finally {
            setIsLoading(false);
        }
    }, [currentPassword, newPassword, isValid]);

    return {
        newPassword, setNewPassword,
        confirmPassword, setConfirmPassword,
        showNew, setShowNew,
        showConfirm, setShowConfirm,
        checks,
        strength,
        isValid,
        isLoading,
        error,
        success,
        submit,
    };
}
