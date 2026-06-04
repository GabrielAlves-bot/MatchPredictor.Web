import { useCallback, useEffect, useState } from "react";
import type { IBracketGuessDeadline } from "../types/BracketGuessDeadlineType";
import {
  getBracketGuessDeadlines,
  updateBracketGuessDeadlines,
} from "../services/BracketGuessDeadlineService";

interface UseBracketGuessDeadlinesReturn {
  deadlines: IBracketGuessDeadline[];
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  updateDeadline: (id: number, deadLine: Date) => void;
  save: () => Promise<void>;
}

export function useBracketGuessDeadlines(
  championshipId: number
): UseBracketGuessDeadlinesReturn {
  const [deadlines, setDeadlines] = useState<IBracketGuessDeadline[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchDeadlines() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getBracketGuessDeadlines(championshipId);
        if (!cancelled) setDeadlines(data);
      } catch {
        if (!cancelled)
          setError("Erro ao carregar os prazos do chaveamento. Tente novamente.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchDeadlines();
    return () => {
      cancelled = true;
    };
  }, [championshipId]);

  const updateDeadline = useCallback((id: number, deadLine: Date) => {
    setDeadlines((prev) =>
      prev.map((d) => (d.id === id ? { ...d, deadLine } : d))
    );
  }, []);

  const save = useCallback(async () => {
    setIsSaving(true);
    setError(null);
    try {
      await updateBracketGuessDeadlines(deadlines);
    } catch {
      setError("Erro ao salvar os prazos do chaveamento. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  }, [deadlines]);

  return { deadlines, isLoading, isSaving, error, updateDeadline, save };
}
