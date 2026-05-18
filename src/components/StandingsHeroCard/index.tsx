import "./styles.css";

interface StandingsHeroCardProps {
  position: number;
  totalPoints: number;
}

export function StandingsHeroCard({ position, totalPoints }: StandingsHeroCardProps) {
  return (
    <div className="standings-hero-card">
      <div className="standings-hero-card__content">
        <div className="standings-hero-card__stats-row">
          <div className="standings-hero-card__stat">
            <p className="standings-hero-card__stat-label">Sua Posição</p>
            <h2 className="standings-hero-card__stat-value--large">
              #{position}
            </h2>
          </div>

          <div className="standings-hero-card__stat standings-hero-card__stat--right">
            <p className="standings-hero-card__stat-label">Total de Pontos</p>
            <p className="standings-hero-card__stat-value--medium">
              {totalPoints}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
