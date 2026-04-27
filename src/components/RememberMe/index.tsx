import "./styles.css";

interface IProps {
  id?: string;
  label?: string;
}

export function RememberMe({ id, label }: IProps) {
  return (
    <div className="remember-me">
      <input className="remember-me__checkbox" id={id} type="checkbox" />
      <label className="remember-me__label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}