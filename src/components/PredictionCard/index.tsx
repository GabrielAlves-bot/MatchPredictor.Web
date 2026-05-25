import { useEffect, useState } from "react";
import { MatchStatus } from "../../enums/MatchStatus";
import { formatMatchDate } from "../../helpers/FormatDate";
import type { IGuess } from "../../types/GuessType";
import type { IMatch } from "../../types/MatchType";
import { MatchStatusBadge } from "../MatchStatusBadge";
import { TeamDisplay } from "../TeamDisplay";
import "./styles.css";

interface IProps {
  readonly?: boolean;
  match: IMatch;
  guess?: IGuess;
  onGuessChange: (
    matchId: number,
    field: "homeGoals" | "awayGoals",
    value: number | null
  ) => void;
}

export function PredictionCard({ readonly, match, guess, onGuessChange }: IProps) {
  const isEditable = !readonly && match.status === MatchStatus.Scheduled;
  
  const [localHome, setLocalHome] = useState<string>(
    guess?.homeGoals != null
      ? String(guess.homeGoals)
      : match.homeGoals != null
        ? String(match.homeGoals)
        : ""
  );

  const [localAway, setLocalAway] = useState<string>(
    guess?.awayGoals != null
      ? String(guess.awayGoals)
      : match.awayGoals != null
        ? String(match.awayGoals)
        : ""
  );

  useEffect(() => {
    setLocalHome(
      guess?.homeGoals != null
        ? String(guess.homeGoals)
        : match.homeGoals != null
          ? String(match.homeGoals)
          : ""
    );
  }, [guess?.homeGoals, match.homeGoals]);

  useEffect(() => {
    setLocalAway(
      guess?.awayGoals != null
        ? String(guess.awayGoals)
        : match.awayGoals != null
          ? String(match.awayGoals)
          : ""
    );
  }, [guess?.awayGoals, match.awayGoals]);

  function handleChange(
    field: "homeGoals" | "awayGoals",
    raw: string,
    setLocal: (v: string) => void
  ) {
    if (raw === "") {
      setLocal("");
      onGuessChange(match.id, field, null);
      return;
    }

    const parsed = parseInt(raw, 10);
    if (isNaN(parsed) || parsed < 0) return;

    setLocal(String(parsed));
    onGuessChange(match.id, field, parsed);
  }

  function handleBlur(local: string, setLocal: (v: string) => void) {
    if (local === "") setLocal("");
  }

  return (
    <div className="prediction-card">
      <div className="prediction-card__header">
        <div>
          <p className="prediction-card__info-date">{formatMatchDate(match.date)}</p>
          <p className="prediction-card__info-venue">
            {match.stadium}, {match.city}
          </p>
        </div>
        <MatchStatusBadge matchStatus={match.status} />
      </div>

      <div className="prediction-card__grid">
        <TeamDisplay
          shieldUrl={match.homeTeam.shieldUrl}
          name={match.homeTeam.name}
        />

        <div className="prediction-card__score">
          <input
            name="homeGoals"
            className="prediction-card__score-input"
            value={localHome}
            type="number"
            min={0}
            disabled={!isEditable}
            onChange={(e) =>
              handleChange("homeGoals", e.target.value, setLocalHome)
            }
            onBlur={() => handleBlur(localHome, setLocalHome)}
          />
          <span className="prediction-card__score-divider">X</span>
          <input
            name="awayGoals"
            className="prediction-card__score-input"
            value={localAway}
            type="number"
            min={0}
            disabled={!isEditable}
            onChange={(e) =>
              handleChange("awayGoals", e.target.value, setLocalAway)
            }
            onBlur={() => handleBlur(localAway, setLocalAway)}
          />
        </div>

        <TeamDisplay
          shieldUrl={match.awayTeam.shieldUrl}
          name={match.awayTeam.name}
        />
      </div>
    </div>
  );
}
