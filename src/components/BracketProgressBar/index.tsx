import "./styles.css";

interface BracketProgressBarProps {
  filled: number;
  total: number;
}

export function BracketProgressBar({ filled, total }: BracketProgressBarProps) {
  const pct = total > 0 ? Math.min((filled / total) * 100, 100) : 0;

  return (
    <div className="bracket-progress-bar">
      <div className="bracket-progress-bar__header">
        <span className="bracket-progress-bar__label">Progresso</span>
        <span className="bracket-progress-bar__count">
          {filled} / {total}
        </span>
      </div>
      <div className="bracket-progress-bar__track">
        <div
          className="bracket-progress-bar__fill"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
