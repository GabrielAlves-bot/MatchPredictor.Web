import "./styles.css";
import { PoolCard } from "../PoolCard";
import type { IPoolSummary } from "../../types/PoolSummaryType";

interface IProps {
  pools: IPoolSummary[];
  onSelect: (pool: IPoolSummary) => void;
}

export function PoolList({ pools, onSelect }: IProps) {
  return (
    <div className="pool-list">
      {pools.map((pool, index) => (
        <PoolCard
          key={pool.poolId}
          pool={pool}
          featured={index === 0}
          onClick={onSelect}
        />
      ))}
    </div>
  );
}
