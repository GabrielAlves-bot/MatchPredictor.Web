import { useCallback, useEffect, useState } from "react";
import type { IScoringRule } from "../types/ScoringRuleType";
import { getScoringRules, updateScoringRules } from "../services/ScoringRuleService";
import { usePool } from "../context/PoolContext";

interface UseScoringRulesResult {
  rules: IScoringRule[];
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  updateRule: (id: number, changes: Partial<IScoringRule>) => void;
  save: () => Promise<void>;
}

export function useScoringRules(): UseScoringRulesResult {
  const [rules, setRules] = useState<IScoringRule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { activePool } = usePool();
  console.log("Active Pool in useScoringRules:", activePool);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getScoringRules(1)
      .then(setRules)
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const updateRule = useCallback((id: number, changes: Partial<IScoringRule>) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...changes } : r))
    );
  }, []);

  const save = useCallback(async () => {
    setIsSaving(true);
    setError(null);
    try {
      await updateScoringRules(rules);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSaving(false);
    }
  }, [rules]);

  return { rules, isLoading, isSaving, error, updateRule, save };
}
