import "./styles.css";
import { useNavigate } from "react-router-dom";
import { PoolList } from "../../components/PoolList";
import { Loading } from "../../components/Loading";
import { usePool } from "../../context/PoolContext";
import paths from "../../routes/paths";
import type { IPoolSummary } from "../../types/PoolSummary";

export function PoolSelector() {
  const { pools, setActivePool, isLoading } = usePool();
  const navigate = useNavigate();

  const handleSelect = (pool: IPoolSummary) => {
    setActivePool(pool);
    navigate(paths.predictions, { replace: true });
  };

  if (isLoading) return <Loading fullscreen text="Carregando bolões..." />;

  return (
    <main className="pool-selector">
      <section className="pool-selector__header">
        <h2 className="pool-selector__title">Meus Bolões</h2>
      </section>

      <PoolList pools={pools} onSelect={handleSelect} />
    </main>
  );
}
