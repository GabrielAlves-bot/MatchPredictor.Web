import "./styles.css";

interface PasswordInputProps {
    id: string;
    label: string;
    value: string;
    show: boolean;
    placeholder?: string;
    onChange: (value: string) => void;
    onToggleShow: () => void;
    children?: React.ReactNode;
}

export function PasswordInput({
    id,
    label,
    value,
    show,
    placeholder = "••••••••",
    onChange,
    onToggleShow,
    children,
}: PasswordInputProps) {
    return (
        <div className="password-input">
            <label className="password-input__label" htmlFor={id}>{label}</label>
            <div className="password-input__wrapper">
                <input
                    id={id}
                    className="password-input__field"
                    type={show ? "text" : "password"}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                <button
                    className="password-input__toggle"
                    type="button"
                    onClick={onToggleShow}
                    aria-label={show ? "Ocultar senha" : "Mostrar senha"}
                >
                    <span className="material-symbols-outlined">
                        {show ? "visibility_off" : "visibility"}
                    </span>
                </button>
            </div>
            {children}
        </div>
    );
}
