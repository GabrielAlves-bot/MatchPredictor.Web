import "./styles.css";

interface IProps {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  forgotPasswordHref?: string;
}

export function PasswordField({
  id,
  label,
  placeholder = "••••••••",
  required = false,
  forgotPasswordHref = "#",
}: IProps) {
  return (
    <div className="password-field">
      <div className="password-field__label-row">
        <label className="password-field__label" htmlFor={id}>
          <span className="material-symbols-outlined">lock</span>
          {label}
        </label>
        <a className="password-field__forgot" href={forgotPasswordHref}>
          Esqueceu a senha?
        </a>
      </div>
      <div className="password-field__wrapper">
        <input
          className="password-field__input"
          id={id}
          placeholder={placeholder}
          required={required}
          type="password"
        />
        <button className="password-field__toggle" type="button">
        </button>
      </div>
    </div>
  );
}
