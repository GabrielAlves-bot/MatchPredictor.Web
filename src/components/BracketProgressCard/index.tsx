import "./styles.css";

interface BracketProgressCardProps {
  totalSelected: number;
  totalSlots: number;
}

export function BracketProgressCard({ totalSelected, totalSlots }: BracketProgressCardProps) {
  const pct = totalSlots > 0 ? Math.min((totalSelected / totalSlots) * 100, 100) : 0;
  const isComplete = totalSelected >= totalSlots;

  return (
    <section className="bracket-progress-card">
      <div className="bracket-progress-card__header">
        <div>
          <p className="bracket-progress-card__label">Status do Bolã<option value=""></option></p>
          <h2 className="bracket-progress-card__title">Progresso do Chaveamento</h2>
        </div>
        <div>
          <span className="bracket-progress-card__value">
            {totalSelected}/{totalSlots}
          </span>
          <p className="bracket-progress-card__value-label">Times Selecionados</p>
        </div>
      </div>

      <div className="bracket-progress-card__bar-bg">
        <div
          className="bracket-progress-card__bar-fill"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="bracket-progress-card__info">
        <span className="material-symbols-outlined">
          {isComplete ? "verified" : "pending"}
        </span>
        <p>
          {isComplete
            ? "Todos os grupos configurados para o mata-mata."
            : `Faltam ${totalSlots - totalSelected} seleções para concluir.`}
        </p>
      </div>
    </section>
  );
}
