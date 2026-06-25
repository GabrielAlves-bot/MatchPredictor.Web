import { useState } from "react";
import "./styles.css";
import { useBracketQualifier } from "../../hooks/useBracketQualifier";
import type { QualifierSlot } from "../../hooks/useBracketQualifier";
import type { ITeam } from "../../types/TeamType";
import { Loading } from "../../components/Loading";
import { BracketRoundTabs } from "../../components/BracketRoundTabs";
import { BracketProgressBar } from "../../components/BracketProgressBar";
import { BracketQualifierSlotGrid } from "../../components/BracketQualifierSlotGrid";
import { TeamSearchModal } from "../../components/TeamSearchModal";
import { SaveBar } from "../../components/SaveBar";
import { BackButton } from "../../components/BackButton";
import { useAuth } from "../../context/AuthContext";
import KNOCKOUT_LABELS from "../../constants/KnockoutLabels";

export function BracketQualifier() {
  const { auth } = useAuth();
  const isAdmin = auth?.role === "Admin";

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
  } = useBracketQualifier(isAdmin);

  const [pendingSlot, setPendingSlot] = useState<QualifierSlot | null>(null);

  if (isLoading)
    return <Loading fullscreen text="Carregando gabarito..." />;

  const activeView = stages.find((s) => s.stage === activeStage) ?? stages[0];

  function handleSlotSelect(slot: QualifierSlot) {
    if (isReadOnly) return;
    setPendingSlot(slot);
  }

  function handleSlotClear(slot: QualifierSlot) {
    if (isReadOnly) return;
    clearSlot(slot.stage, slot.slotIndex);
  }

  function handleTeamSelect(team: ITeam) {
    if (!pendingSlot) return;
    selectTeam(pendingSlot.stage, pendingSlot.slotIndex, team);
    setPendingSlot(null);
  }

  return (
    <>
      <BracketRoundTabs
        stages={stages}
        activeStage={activeStage}
        onStageChange={setActiveStage}
      />

      <main className="bq-page">
        <BackButton text="Voltar para Configurações" />

        <header className="bq-page__header">
          <div className="bq-page__header-top">
            <div>
              <p className="bq-page__label">Gabarito</p>
              <h1 className="bq-page__title">
                {KNOCKOUT_LABELS[activeStage] ?? "Fase"}
              </h1>
            </div>
          </div>

          <BracketProgressBar
            filled={activeView.filledCount}
            total={activeView.totalSlots}
          />
        </header>

        {error && <p className="bq-page__error">{error}</p>}

        {isReadOnly && (
          <p className="bq-page__readonly-notice">
            <span className="material-symbols-outlined">visibility</span>
            Apenas administradores podem editar o gabarito.
          </p>
        )}

        <BracketQualifierSlotGrid
          slots={activeView.slots}
          isReadOnly={isReadOnly}
          onSelect={handleSlotSelect}
          onClear={handleSlotClear}
        />
      </main>

      {isSaving && <Loading fullscreen text="Salvando gabarito..." />}

      {!isReadOnly && <SaveBar onSave={save} title="Salvar Gabarito" />}

      {pendingSlot && (
        <TeamSearchModal
          teams={activeView.availableTeams}
          onSelect={handleTeamSelect}
          onClose={() => setPendingSlot(null)}
        />
      )}
    </>
  );
}