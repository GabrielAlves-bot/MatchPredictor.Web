import "./styles.css";

interface SettingsCardProps {
  icon: string;
  title: string;
  description: string;
  label: string;
  onClick: () => void;
}

export function SettingsCard({ icon, title, description, label, onClick }: SettingsCardProps) {
  return (
    <button className="settings-card" onClick={onClick}>
      <div className="settings-card__icon">
        <span className="material-symbols-outlined">{icon}</span>
      </div>

      <div className="settings-card__body">
        <h3 className="settings-card__title">{title}</h3>
        <p className="settings-card__description">{description}</p>
      </div>

      <div className="settings-card__action">
        <span className="settings-card__action-label">{label}</span>
        <span className="material-symbols-outlined settings-card__chevron">
          chevron_right
        </span>
      </div>
    </button>
  );
}
