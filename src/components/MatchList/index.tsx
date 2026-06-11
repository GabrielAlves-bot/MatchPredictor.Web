import { MatchCard } from "../MatchCard";
import type { IMatch } from "../../types/MatchType";
import { MatchStatus } from "../../enums/MatchStatus";
import "./styles.css";

interface IProps {
  matches: IMatch[];
  isEditable?: boolean;
  onGoalChange?: (
    matchId: number,
    field: "homeGoals" | "awayGoals",
    value: number | null
  ) => void;
  onStatusChange?: (matchId: number, status: MatchStatus) => void;
}

export function MatchList({ matches, isEditable = false, onGoalChange, onStatusChange }: IProps) {
  if (matches.length === 0) {
    return (
      <div className="match-list match-list--empty">
        <p>Sem jogos para esta aba.</p>
      </div>
    );
  }

  return (
    <div className="match-list">
      {matches.map((match) => (
        <MatchCard
          key={match.id}
          match={match}
          isEditable={isEditable}
          onGoalChange={onGoalChange}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}