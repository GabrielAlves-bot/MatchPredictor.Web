import "./styles.css";
import { MatchCard } from "../MatchCard";
import type { IMatch } from "../../types/MatchType";
import type { IGuess } from "../../types/GuessType";

interface IProps {
  matches: IMatch[];
  guesses?: IGuess[];
  onGuessChange?: (matchId: number, field: "homeGoals" | "awayGoals", value: number | null) => void;
}

export function MatchList({ matches, guesses, onGuessChange }: IProps) {
  if (matches.length === 0) {
    return (
      <div className="match-list match-list--empty">
        <p>Sem jogos para esta aba.</p>
      </div>
    );
  }

  return (
    <div className="match-list">
      {matches.map((match) => {
        const guess = guesses?.find((g) => g.matchId === match.id);
        return (
          <MatchCard
            key={match.id}
            match={match}
            guess={guess}
            onGuessChange={onGuessChange}
          />
        );
      })}
    </div>
  );
}