import "./styles.css";

export function TournamentCard() {
  return (
    <section className="tournament-card">
      <span className="material-symbols-outlined tournament-card__bg-pattern">
        sports_soccer
      </span>
      <div className="tournament-card__content">
        <p className="tournament-card__label">Status da Jornada</p>
        <h2 className="tournament-card__title">48 / 104</h2>
        <p className="tournament-card__subtitle">Jogos Preenchidos</p>
        <div className="tournament-card__progress-container">
          <div className="tournament-card__progress-bar" />
        </div>
      </div>
    </section>
  );
}
