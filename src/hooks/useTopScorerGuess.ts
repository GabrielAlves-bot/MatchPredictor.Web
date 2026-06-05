import { useCallback, useEffect, useState } from "react";
import type { ITopScorerGuess } from "../types/TopScorerGuessType";
import {
  getTopScorerGuess,
  updateTopScorerGuesses,
} from "../services/TopScorerGuessService";

interface UseTopScorerGuessReturn {
  guess: ITopScorerGuess | null;
  playerName: string;
  isLoading: boolean;
  isSaving: boolean;
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchGuess() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getTopScorerGuess(poolParticipantId);
        if (!cancelled) {
          setGuess(data);
          setPlayerName(data.playerName ?? "");
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
    if (!playerName.trim()) return;
    setIsSaving(true);
    setError(null);
    try {
      await updateTopScorerGuesses(playerName.trim(), poolParticipantId);
    } catch {
      setError("Erro ao salvar o palpite. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  }, [playerName, poolParticipantId]);

  return { guess, playerName, isLoading, isSaving, error, setPlayerName, save };
}
