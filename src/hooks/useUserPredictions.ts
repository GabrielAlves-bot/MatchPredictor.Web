import { useEffect, useState } from "react";
import type { IMatch } from "../types/MatchType";
import type { IGuess } from "../types/GuessType";
import { getMatches } from "../services/MatchService";
import { getGuesses } from "../services/GuessService";

interface UseUserPredictionsResult {
  matches: IMatch[];
  guesses: IGuess[];
  isLoading: boolean;
  error: string | null;
}

export function useUserPredictions(poolParticipantId: number): UseUserPredictionsResult {
  const [matches, setMatches] = useState<IMatch[]>([]);
  const [guesses, setGuesses] = useState<IGuess[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!poolParticipantId) return;

    setIsLoading(true);
    setError(null);

    Promise.all([getMatches(), getGuesses(poolParticipantId)])
      .then(([matchesRes, guessesRes]) => {
        setMatches(matchesRes);
        setGuesses(guessesRes);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [poolParticipantId]);

  return { matches, guesses, isLoading, error };
}
