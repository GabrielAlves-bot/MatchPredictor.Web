import { useEffect, useState } from "react";
import { formatMatchDate } from "../../helpers/FormatDate";
import type { IMatch } from "../../types/MatchType";
import { MatchStatusBadge } from "../MatchStatusBadge";
import { TeamDisplay } from "../TeamDisplay";
import { MatchStatus } from "../../enums/MatchStatus";
import "./styles.css";

interface IProps {
  match: IMatch;
  isEditable?: boolean;
  onGoalChange?: (
    matchId: number,
    field: "homeGoals" | "awayGoals",
    value: number | null
  ) => void;
  onStatusChange?: (matchId: number, status: MatchStatus) => void;
  onMatchClick?: (matchId: number) => void;
}

export function MatchCard({ match, isEditable = false, onGoalChange, onStatusChange, onMatchClick }: IProps) {
  const [localHome, setLocalHome] = useState<string>(
    match.homeGoals != null ? String(match.homeGoals) : ""
  );
  const [localAway, setLocalAway] = useState<string>(
    match.awayGoals != null ? String(match.awayGoals) : ""
  );

  useEffect(() => {
    setLocalHome(match.homeGoals != null ? String(match.homeGoals) : "");
  }, [match.homeGoals]);

  useEffect(() => {
    setLocalAway(match.awayGoals != null ? String(match.awayGoals) : "");
  }, [match.awayGoals]);

  function handleChange(
    field: "homeGoals" | "awayGoals",
    raw: string,
    setLocal: (v: string) => void
  ) {
    if (raw === "") {
      setLocal("");
      onGoalChange?.(match.id, field, null);
      return;
    }

    const parsed = parseInt(raw, 10);
    if (isNaN(parsed) || parsed < 0) return;

    setLocal(String(parsed));
    onGoalChange?.(match.id, field, parsed);
  }

  return (
    <div className="match-card">
      <div className="match-card__header">
        <div>
          <p className="match-card__info-date">{formatMatchDate(match.date)}</p>
          <p className="match-card__info-venue">
            {match.stadium}, {match.city}
          </p>
        </div>
        <MatchStatusBadge
          matchStatus={match.status}
          isEditable={isEditable}
          onStatusChange={(status) => onStatusChange?.(match.id, status)}
        />
      </div>

      <div className="match-card__grid">
        <TeamDisplay
          shieldUrl={match.homeTeam.shieldUrl}
          name={match.homeTeam.name}
        />

        <div className="match-card__score">
          <input
            name="homeGoals"
            className="match-card__score-input"
            value={localHome}
            type="number"
            min={0}
            disabled={!isEditable}
            onChange={(e) =>
              handleChange("homeGoals", e.target.value, setLocalHome)
            }
          />
          <span className="match-card__score-divider">X</span>
          <input
            name="awayGoals"
            className="match-card__score-input"
            value={localAway}
            type="number"
            min={0}
            disabled={!isEditable}
            onChange={(e) =>
              handleChange("awayGoals", e.target.value, setLocalAway)
            }
          />
        </div>

        <TeamDisplay
          shieldUrl={match.awayTeam.shieldUrl}
          name={match.awayTeam.name}
        />
      </div>

      {onMatchClick && (
        <button
          className="match-card__guesses-btn"
          onClick={() => onMatchClick(match.id)}
          aria-label="Ver palpites da partida"
        >
          <span className="material-symbols-outlined">groups</span>
          <span className="match-card__guesses-btn-label">Ver palpites</span>
          <span className="material-symbols-outlined match-card__guesses-btn-chevron">chevron_right</span>
        </button>
      )}
    </div>
  );
}