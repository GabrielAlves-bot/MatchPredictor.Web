import { useEffect, useState } from "react";
import { MatchStatus } from "../../enums/MatchStatus";
import { formatMatchDate } from "../../helpers/FormatDate";
import type { IGuess } from "../../types/GuessType";
import type { IMatch } from "../../types/MatchType";
import { MatchStatusBadge } from "../MatchStatusBadge";
import { TeamDisplay } from "../TeamDisplay";
import "./styles.css";

interface IProps {
  match: IMatch;
  guess?: IGuess;
  onGuessChange?: (matchId: number, field: "homeGoals" | "awayGoals", value: number | null) => void;
}

export function MatchCard({ match, guess, onGuessChange }: IProps) {
  const isEditable = !!onGuessChange && match.status === MatchStatus.Scheduled;

  const [localHome, setLocalHome] = useState<string>(
    guess?.homeGoals != null ? String(guess.homeGoals) : ""
  );
  const [localAway, setLocalAway] = useState<string>(
    guess?.awayGoals != null ? String(guess.awayGoals) : ""
  );

  useEffect(() => {
    setLocalHome(guess?.homeGoals != null ? String(guess.homeGoals) : "");
  }, [guess?.homeGoals]);

  useEffect(() => {
    setLocalAway(guess?.awayGoals != null ? String(guess.awayGoals) : "");
  }, [guess?.awayGoals]);

  function handleChange(
    field: "homeGoals" | "awayGoals",
    raw: string,
    setLocal: (v: string) => void
  ) {
    if (raw === "") {
      setLocal("");
      onGuessChange?.(match.id, field, null);
      return;
    }

    const parsed = parseInt(raw, 10);
    if (isNaN(parsed) || parsed < 0) return;

    setLocal(String(parsed));
    onGuessChange?.(match.id, field, parsed);
  }

  function handleBlur(local: string, setLocal: (v: string) => void) {
    // campo vazio permanece vazio — não força 0
    if (local === "") {
      setLocal("");
    }
  }

  return (
    <div className="match-card">
      <div className="match-card__header">
        <div>
          <p className="match-card__info-date">{formatMatchDate(match.date)}</p>
          <p className="match-card__info-venue">{match.stadium}, {match.city}</p>
        </div>
        <MatchStatusBadge matchStatus={match.status} />
      </div>

      <div className="match-card__grid">
        <TeamDisplay shieldUrl={match.homeTeam.shieldUrl} name={match.homeTeam.name} />

        <div className="match-card__score">
          <input
            name="homeGoals"
            className="match-card__score-input"
            value={localHome}
            type="number"
            min={0}
            disabled={!isEditable}
            onChange={(e) => handleChange("homeGoals", e.target.value, setLocalHome)}
            onBlur={() => handleBlur(localHome, setLocalHome)}
          />
          <span className="match-card__score-divider">X</span>
          <input
            name="awayGoals"
            className="match-card__score-input"
            value={localAway}
            type="number"
            min={0}
            disabled={!isEditable}
            onChange={(e) => handleChange("awayGoals", e.target.value, setLocalAway)}
            onBlur={() => handleBlur(localAway, setLocalAway)}
          />
        </div>

        <TeamDisplay shieldUrl={match.awayTeam.shieldUrl} name={match.awayTeam.name} />
      </div>
    </div>
  );
}