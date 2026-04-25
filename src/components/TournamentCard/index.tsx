import "./styles.css";

interface IProps {
  filled?: number;
  total?: number;
}

export function TournamentCard({ filled = 0, total = 0 }: IProps) {
  const progress = total > 0 ? (filled / total) * 100 : 0;

  return (
    <section className="tournament-card">
      <span className="material-symbols-outlined tournament-card__bg-pattern">
        sports_soccer
      </span>
      <div className="tournament-card__content">
        <p className="tournament-card__label">Status da Jornada</p>
        <h2 className="tournament-card__title">{filled} / {total}</h2>
        <p className="tournament-card__subtitle">Jogos Preenchidos</p>
        <div className="tournament-card__progress-container">
          <div
            className="tournament-card__progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </section>
  );
}
