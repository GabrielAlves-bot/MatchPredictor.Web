import "./styles.css";

interface GuessCardProps {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
}

export function GuessCard({ icon, title, description, onClick }: GuessCardProps) {
  return (
    <button className="guess-card" onClick={onClick}>
      <div className="guess-card__icon">
        <span className="material-symbols-outlined">{icon}</span>
      </div>

      <div className="guess-card__body">
        <h3 className="guess-card__title">{title}</h3>
        <p className="guess-card__description">{description}</p>
      </div>

      <div className="guess-card__action">
        <span className="guess-card__action-label">Palpitar</span>
        <span className="material-symbols-outlined guess-card__chevron">
          chevron_right
        </span>
      </div>
    </button>
  );
}
