import "./styles.css";

interface IProps {
  id: string;
  label: string;
  icon: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

export function FormField({
  id,
  label,
  icon,
  type = "text",
  placeholder,
  required = false,
}: IProps) {
  return (
    <div className="form-field">
      <label className="form-field__label" htmlFor={id}>
        <span className="material-symbols-outlined">{icon}</span>
        {label}
      </label>
      <input
        className="form-field__input"
        id={id}
        placeholder={placeholder}
        required={required}
        type={type}
        autoComplete="off"
      />
    </div>
  );
}
