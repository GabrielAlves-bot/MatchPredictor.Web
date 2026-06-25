import { useState, useEffect } from "react";
import { usePool } from "../context/PoolContext";
import type { IBracketQualifierRule } from "../types/BracketQualifierRuleType";
import {
  getBracketQualifierRules,
  updateBracketQualifierRules,
} from "../services/BracketQualifierRuleService";

export function useBracketQualifierRules() {
  const { activePool } = usePool();
  const [rules, setRules] = useState<IBracketQualifierRule[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!activePool?.poolId) return;

    async function load() {
      try {
        setIsLoading(true);
        const data = await getBracketQualifierRules(activePool!.poolId);
        setRules(data);
      } catch {
        setError("Erro ao carregar regras de pontos extras.");
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, [activePool?.poolId]);

  function updateRule(id: number, changes: Partial<IBracketQualifierRule>) {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...changes } : r))
    );
  }

  async function save() {
    try {
      setIsSaving(true);
      await updateBracketQualifierRules(rules);
    } catch {
      setError("Erro ao salvar regras de pontos extras.");
    } finally {
      setIsSaving(false);
    }
  }

  return { rules, isLoading, isSaving, error, updateRule, save };
}