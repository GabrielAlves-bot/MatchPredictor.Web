import "./styles.css";
import { MatchPhase } from "../../enums/MatchPhase";
import { Loading } from "../../components/Loading";
import { BracketProgressCard } from "../../components/BracketProgressCard";
import { BracketPhaseTabs } from "../../components/BracketPhaseTabs";
import { BracketGroupCard } from "../../components/BracketGroupCard";
import { BracketSaveButton } from "../../components/BracketSaveButton";
import { usePool } from "../../context/PoolContext";
import { useBracket } from "../../hooks/useBracket";

export function Bracket() {
  const { activePool } = usePool();
  const poolParticipantId = activePool!.poolParticipantId;

  const {
    phases,
    activeTab,
    setActiveTab,
    isLoading,
    isSaving,
    error,
    totalSelected,
    totalSlots,
    toggle,
    save,
  } = useBracket(poolParticipantId);

  if (isLoading) return <Loading fullscreen text="Carregando chaveamento..." />;

  const activePhase = phases[activeTab];
  const isGroupStage = activePhase?.phase === MatchPhase.GroupStage;

  return (
    <main className="bracket-page">
      <BracketProgressCard
        totalSelected={totalSelected}
        totalSlots={totalSlots}
      />

      {error && <p className="bracket-page__error">{error}</p>}

      <BracketPhaseTabs
        phases={phases}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {activePhase && (
        <div className="bracket-page__group-grid">
          {activePhase.groups.map((group) => (
            <BracketGroupCard
              key={group.key}
              group={group}
              isGroupStage={isGroupStage}
              onToggle={toggle}
            />
          ))}
        </div>
      )}

      <BracketSaveButton
        isSaving={isSaving}
        onSave={() => save(poolParticipantId)}
      />
    </main>
  );
}
