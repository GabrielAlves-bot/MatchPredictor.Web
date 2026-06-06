import { useState } from "react";
import "./styles.css";
import { useBracket } from "../../hooks/useBracket";
import type { BracketSlot } from "../../hooks/useBracket";
import type { ITeam } from "../../types/TeamType";
import { Loading } from "../../components/Loading";
import { BracketRoundTabs } from "../../components/BracketRoundTabs";
import { BracketProgressBar } from "../../components/BracketProgressBar";
import { BracketSlotGrid } from "../../components/BracketSlotGrid";
import { TeamSearchModal } from "../../components/TeamSearchModal";
import KNOCKOUT_LABELS from "../../constants/KnockoutLabels";
import { usePool } from "../../context/PoolContext";
import { SaveBar } from "../../components/SaveBar";

export function Bracket() {
  const { activePool } = usePool();

  const {
    stages,
    activeStage,
    setActiveStage,
    isLoading,
    isSaving,
    error,
    selectTeam,
    clearSlot,
    save,
  } = useBracket(activePool?.poolParticipantId ?? 0);

  const [pendingSlot, setPendingSlot] = useState<BracketSlot | null>(null);

  if (isLoading)
    return <Loading fullscreen text="Carregando chaveamento..." />;

  const activeView = stages.find((s) => s.stage === activeStage) ?? stages[0];

  function handleSlotSelect(slot: BracketSlot) {
    setPendingSlot(slot);
  }

  function handleSlotClear(slot: BracketSlot) {
    clearSlot(slot.stage, slot.slotIndex);
  }

  function handleTeamSelect(team: ITeam) {
    if (!pendingSlot) return;
    selectTeam(pendingSlot.stage, pendingSlot.slotIndex, team);
    setPendingSlot(null);
  }

  const availableTeams = activeView.availableTeams;

  return (
    <>
      <BracketRoundTabs
        stages={stages}
        activeStage={activeStage}
        onStageChange={setActiveStage}
      />

      <main className="bracket-page">
        <header className="bracket-page__header">
          <div className="bracket-page__header-top">
            <div>
              <p className="bracket-page__label">Chaveamento</p>
              <h1 className="bracket-page__title">
                {KNOCKOUT_LABELS[activeStage] ?? "Fase"}
              </h1>
            </div>
          </div>

          <BracketProgressBar
            filled={activeView.filledCount}
            total={activeView.totalSlots}
          />
        </header>

        {error && <p className="bracket-page__error">{error}</p>}

        <BracketSlotGrid
          slots={activeView.slots}
          onSelect={handleSlotSelect}
          onClear={handleSlotClear}
        />
      </main>
      {isSaving && <Loading fullscreen text="Salvando palpite..." />}

      <SaveBar onSave={save} title="Salvar Palpite" />


      {pendingSlot && (
        <TeamSearchModal
          teams={availableTeams}
          onSelect={handleTeamSelect}
          onClose={() => setPendingSlot(null)}
        />
      )}
    </>
  );
}