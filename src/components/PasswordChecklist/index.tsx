import "./styles.css";

interface PasswordChecklistProps {
    hasMinLength: boolean;
    hasUpperCase: boolean;
    hasNumberOrSymbol: boolean;
}

interface CheckItemProps {
    valid: boolean;
    label: string;
}

function CheckItem({ valid, label }: CheckItemProps) {
    return (
        <div className={`password-checklist__item${valid ? " password-checklist__item--valid" : ""}`}>
            <span
                className="material-symbols-outlined"
                style={valid ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
                {valid ? "check_circle" : "radio_button_unchecked"}
            </span>
            <span>{label}</span>
        </div>
    );
}

export function PasswordChecklist({ hasMinLength, hasUpperCase, hasNumberOrSymbol }: PasswordChecklistProps) {
    return (
        <div className="password-checklist">
            <p className="password-checklist__title">Requisitos de Segurança</p>
            <CheckItem valid={hasMinLength}       label="Mínimo de 8 caracteres" />
            <CheckItem valid={hasUpperCase}       label="Uma letra maiúscula" />
            <CheckItem valid={hasNumberOrSymbol}  label="Número ou símbolo" />
        </div>
    );
}
