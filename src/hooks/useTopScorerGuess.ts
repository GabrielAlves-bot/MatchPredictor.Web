import { useCallback, useEffect, useState } from "react";
import type { ITopScorerGuess } from "../types/TopScorerGuessType";
import {
  getTopScorerGuess,
  hasTopScorerGuessDeadlinePassed,
  updateTopScorerGuesses,
} from "../services/TopScorerGuessService";

interface UseTopScorerGuessReturn {
  guess: ITopScorerGuess | null;
  playerName: string;
  isLoading: boolean;
  isSaving: boolean;
  isReadonly: boolean;
  error: string | null;
  setPlayerName: (name: string) => void;
  save: () => Promise<void>;
}

export function useTopScorerGuess(
  poolParticipantId: number
): UseTopScorerGuessReturn {
  const [guess, setGuess] = useState<ITopScorerGuess | null>(null);
  const [playerName, setPlayerName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isReadonly, setIsReadonly] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchGuess() {
      setIsLoading(true);
      setError(null);
      try {
        const [data, deadlinePassed] = await Promise.all([
          getTopScorerGuess(poolParticipantId),
          hasTopScorerGuessDeadlinePassed(),
        ]);
        if (!cancelled) {
          setGuess(data);
          setPlayerName(data.playerName ?? "");
          setIsReadonly(deadlinePassed);
        }
      } catch {
        if (!cancelled)
          setError("Erro ao carregar o palpite. Tente novamente.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchGuess();
    return () => {
      cancelled = true;
    };
  }, [poolParticipantId]);

  const save = useCallback(async () => {
    if (!playerName.trim() || isReadonly) return;
    setIsSaving(true);
    setError(null);
    try {
      await updateTopScorerGuesses(playerName.trim(), poolParticipantId);
    } catch {
      setError("Erro ao salvar o palpite. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  }, [playerName, poolParticipantId, isReadonly]);

  return { guess, playerName, isLoading, isSaving, isReadonly, error, setPlayerName, save };
}