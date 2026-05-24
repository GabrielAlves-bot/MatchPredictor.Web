import { PredictionCard } from "../PredictionCard";
import type { IGuess } from "../../types/GuessType";
import type { IMatch } from "../../types/MatchType";
import "./styles.css";

interface IProps {
  matches: IMatch[];
  guesses: IGuess[];
  onGuessChange: (
    matchId: number,
    field: "homeGoals" | "awayGoals",
    value: number | null
  ) => void;
}

export function PredictionList({ matches, guesses, onGuessChange }: IProps) {
  if (matches.length === 0) {
    return (
      <div className="prediction-list prediction-list--empty">
        <p>Sem jogos para esta aba.</p>
      </div>
    );
  }

  return (
    <div className="prediction-list">
      {matches.map((match) => {
        const guess = guesses.find((g) => g.matchId === match.id);
        return (
          <PredictionCard
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
