import "./styles.css";
import type { BracketMatchView } from "../../hooks/useBracket";

interface BracketMatchCardProps {
  match: BracketMatchView;
  onPickWinner: (matchId: number, winnerId: number) => void;
}

export function BracketMatchCard({ match, onPickWinner }: BracketMatchCardProps) {
  const { matchId, homeTeam, awayTeam, selectedWinnerId } = match;

  const homeSelected = selectedWinnerId === homeTeam.id;
  const awaySelected = selectedWinnerId === awayTeam.id;
  const hasPick      = selectedWinnerId !== undefined;

  return (
    <div className="bracket-match-card">
      {/* Time da Casa */}
      <button
        className={[
          "bracket-match-card__team",
          homeSelected ? "bracket-match-card__team--winner" : "",
          hasPick && !homeSelected ? "bracket-match-card__team--loser" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={() => onPickWinner(matchId, homeTeam.id)}
      >
        <div className="bracket-match-card__team-info">
          {homeTeam.shieldUrl ? (
            <img
              src={homeTeam.shieldUrl}
              alt={homeTeam.name}
              className="bracket-match-card__shield"
            />
          ) : (
            <div className="bracket-match-card__shield-placeholder">?</div>
          )}
          <span className="bracket-match-card__team-name">{homeTeam.name}</span>
        </div>

        {homeSelected && (
          <span
            className="material-symbols-outlined bracket-match-card__check"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
        )}
      </button>

      {/* Divisor */}
      <div className="bracket-match-card__vs">VS</div>

      {/* Time Visitante */}
      <button
        className={[
          "bracket-match-card__team",
          awaySelected ? "bracket-match-card__team--winner" : "",
          hasPick && !awaySelected ? "bracket-match-card__team--loser" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={() => onPickWinner(matchId, awayTeam.id)}
      >
        <div className="bracket-match-card__team-info">
          {awayTeam.shieldUrl ? (
            <img
              src={awayTeam.shieldUrl}
              alt={awayTeam.name}
              className="bracket-match-card__shield"
            />
          ) : (
            <div className="bracket-match-card__shield-placeholder">?</div>
          )}
          <span className="bracket-match-card__team-name">{awayTeam.name}</span>
        </div>

        {awaySelected && (
          <span
            className="material-symbols-outlined bracket-match-card__check"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
        )}
      </button>
    </div>
  );
}
