import { useCallback, useEffect, useState } from "react";
import type { IPredictionDeadline } from "../types/PredictionDeadline";
import {
  getPredictionDeadlines,
  updatePredictionDeadlines,
} from "../services/PredictionDeadlineService";

interface UsePredictionDeadlinesResult {
  deadlines: IPredictionDeadline[];
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  updateDeadline: (id: number, deadLine: Date) => void;
  save: () => Promise<void>;
}

export function usePredictionDeadlines(championshipId: number): UsePredictionDeadlinesResult {
  const [deadlines, setDeadlines] = useState<IPredictionDeadline[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!championshipId) return;
    setIsLoading(true);
    setError(null);
    getPredictionDeadlines(championshipId)
      .then(setDeadlines)
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false));
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
      await updatePredictionDeadlines(deadlines);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSaving(false);
    }
  }, [deadlines]);

  return { deadlines, isLoading, isSaving, error, updateDeadline, save };
}
