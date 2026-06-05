import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useChangePassword } from "../../hooks/useChangePassword";
import { PasswordInput } from "../../components/PasswordInput";
import { PasswordStrengthBar } from "../../components/PasswordStrengthBar";
import { PasswordChecklist } from "../../components/PasswordChecklist";
import "./styles.css";
import paths from "../../routes/paths";

export function ChangePassword() {
    const { mustChangePassword, clearMustChangePassword } = useAuth();
    const navigate = useNavigate();

    const currentPassword = "";

    const {
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
    } = useChangePassword(currentPassword);

    useEffect(() => {
        if (success) {
            clearMustChangePassword();
            const timer = setTimeout(() => navigate(paths.myGuesses, { replace: true }), 1800);
            return () => clearTimeout(timer);
        }
    }, [success, clearMustChangePassword, navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submit();
    };

    return (
        <div className="change-password-page">
            <main className="change-password-page__main">
                <div className="change-password-page__card">
                    <header className="change-password-page__header">
                        <h2 className="change-password-page__title">Redefinir Senha</h2>
                        <p className="change-password-page__subtitle">
                            {mustChangePassword
                                ? "Por segurança, crie uma nova senha para continuar."
                                : "Crie uma senha forte para proteger seu acesso."}
                        </p>
                    </header>

                    {success ? (
                        <div className="change-password-page__success">
                            <span className="material-symbols-outlined">check_circle</span>
                            <h3>Senha atualizada!</h3>
                            <p>Redirecionando para o início...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} noValidate>
                            {error && (
                                <p className="change-password-page__error">{error}</p>
                            )}

                            <PasswordInput
                                id="new-password"
                                label="Nova Senha"
                                value={newPassword}
                                show={showNew}
                                onChange={setNewPassword}
                                onToggleShow={() => setShowNew(v => !v)}
                            >
                                <PasswordStrengthBar strength={strength} />
                            </PasswordInput>

                            <PasswordInput
                                id="confirm-password"
                                label="Confirmar Nova Senha"
                                value={confirmPassword}
                                show={showConfirm}
                                onChange={setConfirmPassword}
                                onToggleShow={() => setShowConfirm(v => !v)}
                            />

                            <PasswordChecklist
                                hasMinLength={checks.hasMinLength}
                                hasUpperCase={checks.hasUpperCase}
                                hasNumberOrSymbol={checks.hasNumberOrSymbol}
                            />

                            <button
                                className="change-password-page__submit"
                                type="submit"
                                disabled={!isValid || isLoading}
                            >
                                <span className="material-symbols-outlined">lock_reset</span>
                                {isLoading ? "Salvando..." : "Salvar e Entrar"}
                            </button>
                        </form>
                    )}
                </div>
            </main>
        </div>
    );
}
