import { useState, useEffect } from "react";
import { getPoolRanking } from "../services/PoolService";
import type { IPoolRanking } from "../types/PoolRankingType";

interface UsePoolRankingResult {
  ranking: IPoolRanking[];
  isLoading: boolean;
  error: string | null;
}

export function usePoolRanking(poolId: number | undefined): UsePoolRankingResult {
  const [ranking, setRanking] = useState<IPoolRanking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!poolId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    getPoolRanking(poolId)
      .then(setRanking)
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [poolId]);

  return { ranking, isLoading, error };
}