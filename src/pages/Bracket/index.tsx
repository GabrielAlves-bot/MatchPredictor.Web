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

  const poolParticipantId = activePool?.poolParticipantId ?? 0;

  const {
    stages,
    activeStage,
    setActiveStage,
    isLoading,
    isSaving,
    isReadOnly,
    error,
    selectTeam,
    clearSlot,
    save,
  } = useBracket(poolParticipantId);

  const [pendingSlot, setPendingSlot] = useState<BracketSlot | null>(null);

  if (!activePool)
    return <Loading fullscreen text="Carregando bolão..." />;

  if (isLoading)
    return <Loading fullscreen text="Carregando chaveamento..." />;

  const activeView = stages.find((s) => s.stage === activeStage) ?? stages[0];

  function handleSlotSelect(slot: BracketSlot) {
    if (isReadOnly) return;
    setPendingSlot(slot);
  }

  function handleSlotClear(slot: BracketSlot) {
    if (isReadOnly) return;
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

        {isReadOnly && (
          <p className="bracket-page__readonly-notice">
            <span className="material-symbols-outlined">lock</span>
            Prazo encerrado. Palpites bloqueados.
          </p>
        )}

        <BracketSlotGrid
          slots={activeView.slots}
          isReadOnly={isReadOnly}
          onSelect={handleSlotSelect}
          onClear={handleSlotClear}
        />
      </main>

      {isSaving && <Loading fullscreen text="Salvando palpite..." />}

      {!isReadOnly && <SaveBar onSave={save} title="Salvar Palpite" />}

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
