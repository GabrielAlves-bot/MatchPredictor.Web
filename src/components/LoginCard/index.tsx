import "./styles.css";
import { FormField } from "../FormField";
import { PasswordField } from "../PasswordField";
import { RememberMe } from "../RememberMe";
import { SubmitButton } from "../SubmitButton";

export function LoginCard() {
  return (
    <div className="login-card">
      <h2 className="login-card__title">Bem-vindo</h2>
      <p className="login-card__subtitle">
        Acesse sua conta para gerenciar seus palpites.
      </p>

      <form className="login-card__form">
        <FormField
          id="email"
          label="E-mail"
          icon="mail"
          type="email"
          placeholder="nome@exemplo.com"
          required
        />

        <PasswordField
          id="password"
          label="Senha"
          placeholder="••••••••"
          required
          forgotPasswordHref="#"
        />

        <RememberMe id="remember" label="Lembrar de mim" />

        <SubmitButton />
      </form>
    </div>
  );
}
