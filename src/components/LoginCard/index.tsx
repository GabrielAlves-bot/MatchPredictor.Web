import "./styles.css";
import { FormField } from "../FormField";
import { PasswordField } from "../PasswordField";
import { RememberMe } from "../RememberMe";
import { SubmitButton } from "../SubmitButton";
import { useState, type FormEvent } from "react";
import { useLogin } from "../../hooks/UseLogin";

export function LoginCard() {
  const { error, submit } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await submit({ email, password });
  }

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
          onChange={(e: any) => setEmail(e.target.value)}
        />

        <PasswordField
          id="password"
          label="Senha"
          placeholder="••••••••"
          required
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
        />

        <RememberMe id="remember" label="Lembrar de mim" />

        {error && <p className="login-card__error">{error}</p>}

        <SubmitButton />
      </form>
    </div>
  );
}
