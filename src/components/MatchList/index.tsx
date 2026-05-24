import { MatchCard } from "../MatchCard";
import type { IMatch } from "../../types/MatchType";
import "./styles.css";

interface IProps {
  matches: IMatch[];
  isEditable?: boolean;
  onGoalChange?: (
    matchId: number,
    field: "homeGoals" | "awayGoals",
    value: number | null
  ) => void;
}

export function MatchList({ matches, isEditable = false, onGoalChange }: IProps) {
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
        />
      ))}
    </div>
  );
}
