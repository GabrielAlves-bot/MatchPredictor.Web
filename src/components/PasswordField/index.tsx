import "./styles.css";

interface IProps {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
    value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function PasswordField({
  id,
  label,
  placeholder = "••••••••",
  required = false,
    value,
  onChange,
}: IProps) {
  return (
    <div className="password-field">
      <div className="password-field__label-row">
        <label className="password-field__label" htmlFor={id}>
          <span className="material-symbols-outlined">lock</span>
          {label}
        </label>
      </div>
      <div className="password-field__wrapper">
        <input
          className="password-field__input"
          id={id}
          placeholder={placeholder}
          required={required}
          type="password"
          value={value}
          onChange={onChange}
        />
        <button className="password-field__toggle" type="button">
        </button>
      </div>
    </div>
  );
}
