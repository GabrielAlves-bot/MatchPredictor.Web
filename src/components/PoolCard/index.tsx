import type { IPoolSummary } from "../../types/PoolSummary";
import "./styles.css";

interface PoolCardProps {
  pool: IPoolSummary;
  featured?: boolean;
  onClick: (pool: IPoolSummary) => void;
}

export function PoolCard({ pool, featured = false, onClick }: PoolCardProps) {
  return (
    <button
      className={`pool-card${featured ? " pool-card--featured" : ""}`}
      onClick={() => onClick(pool)}
    >
      <div className="pool-card__info">
        <div className="pool-card__icon-box">
          <span className="material-symbols-outlined">groups</span>
        </div>
        <div className="pool-card__details">
          <h4 className="pool-card__name">{pool.poolName}</h4>
          {/* <span className="pool-card__meta">
            {pool.participantsCount} Participantes
          </span> */}
        </div>
      </div>
      <div className="pool-card__score">
        <span className="pool-card__score-label">Pontos</span>
        <span className="pool-card__score-value">
          {pool.score.toLocaleString("pt-BR")}
        </span>
      </div>
    </button>
  );
}
