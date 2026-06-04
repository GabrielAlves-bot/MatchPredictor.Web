import "./styles.css";

interface PasswordStrengthBarProps {
    strength: number;
}

export function PasswordStrengthBar({ strength }: PasswordStrengthBarProps) {
    return (
        <div className="password-strength-bar">
            {[1, 2, 3, 4].map((level) => (
                <div
                    key={level}
                    className={`password-strength-bar__segment${strength >= level ? " password-strength-bar__segment--active" : ""}`}
                />
            ))}
        </div>
    );
}
