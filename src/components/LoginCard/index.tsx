import "./styles.css";
import { FormField } from "../FormField";
import { PasswordField } from "../PasswordField";
import { RememberMe } from "../RememberMe";
import { SubmitButton } from "../SubmitButton";
import { Loading } from "../Loading"; // IMPORT FALTANDO
import { useState, type FormEvent, type ChangeEvent } from "react";
import { useLogin } from "../../hooks/UseLogin";
import { useMinimumLoading } from "../../hooks/useMinimumLoading";

export function LoginCard() {
  const { error, submit, isLoading } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await submit({ email, password });
  }

  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  const loading = useMinimumLoading(isLoading);

  return (
    <div className="login-card">
      <h2 className="login-card__title">Bem-vindo</h2>

      <p className="login-card__subtitle">
        Acesse sua conta para gerenciar seus palpites.
      </p>

      <form className="login-card__form" onSubmit={handleSubmit}>
        <FormField
          id="email"
          label="E-mail"
          icon="mail"
          type="email"
          placeholder="nome@exemplo.com"
          required
          value={email}
          onChange={handleEmailChange}
        />

        <PasswordField
          id="password"
          label="Senha"
          placeholder="••••••••"
          required
          value={password}
          onChange={handlePasswordChange}
        />

        <RememberMe id="remember" label="Lembrar de mim" />

        {error && <p className="login-card__error">{error}</p>}

        <SubmitButton />

        {loading && <Loading text="Entrando..." fullscreen />}
      </form>
    </div>
  );
}