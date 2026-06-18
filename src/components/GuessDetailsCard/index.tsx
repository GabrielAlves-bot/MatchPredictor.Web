import "./styles.css";
import type { IGuessDetails } from "../../types/GuessDetails";

interface IProps {
  guess: IGuessDetails;
}

function getPtsBadgeModifier(score: number): string {
  return `guess-details-card__pts-badge--score-${Math.max(0, Math.min(score, 6))}`;
}

export function GuessDetailsCard({ guess }: IProps) {
  const hasPrediction = guess.homeGoals != null && guess.awayGoals != null;

  return (
    <div className="guess-details-card">
      <div className="guess-details-card__user">
        <div className="guess-details-card__avatar">
          <span className="material-symbols-outlined">person</span>
        </div>
        <span className="guess-details-card__name">{guess.userName}</span>
      </div>

      <div className="guess-details-card__right">
        {hasPrediction ? (
          <div className="guess-details-card__prediction">
            <span className="guess-details-card__pred-value">
              {guess.homeGoals} x {guess.awayGoals}
            </span>
            <span className="guess-details-card__pred-label">Palpite</span>
          </div>
        ) : (
          <div className="guess-details-card__prediction">
            <span className="guess-details-card__pred-value guess-details-card__pred-value--empty">
              – x –
            </span>
            <span className="guess-details-card__pred-label">Sem palpite</span>
          </div>
        )}

        <div className={`guess-details-card__pts-badge ${getPtsBadgeModifier(guess.score)}`}>
          <span className="guess-details-card__pts-value">
            {guess.score > 0 ? `+${guess.score}` : guess.score}
          </span>
          <span className="guess-details-card__pts-unit">pts</span>
        </div>
      </div>
    </div>
  );
}
