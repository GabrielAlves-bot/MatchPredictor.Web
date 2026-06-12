import { useParams } from "react-router-dom";
import { Loading } from "../../components/Loading";
import { BracketRoundTabs } from "../../components/BracketRoundTabs";
import { BracketProgressBar } from "../../components/BracketProgressBar";
import { BracketSlotGrid } from "../../components/BracketSlotGrid";
import KNOCKOUT_LABELS from "../../constants/KnockoutLabels";
import { useBracket } from "../../hooks/useBracket";
import { BackButton } from "../../components/BackButton";
import "./styles.css";

export function UserBracketPredictions() {
  const { poolParticipantId } = useParams<{ poolParticipantId: string }>();
  const id = Number(poolParticipantId);

  const {
    stages,
    activeStage,
    setActiveStage,
    isLoading,
    error,
  } = useBracket(id);

  if (isLoading)
    return <Loading fullscreen text="Carregando chaveamento..." />;

  const activeView = stages.find((s) => s.stage === activeStage) ?? stages[0];

  return (
    <>
      <BracketRoundTabs
        stages={stages}
        activeStage={activeStage}
        onStageChange={setActiveStage}
      />

      <main className="user-bracket-page">
              <BackButton text="Voltar para o Menu" />

        <header className="user-bracket-page__header">
          <div className="user-bracket-page__header-top">
            <div>
              <p className="user-bracket-page__label">Chaveamento</p>
              <h1 className="user-bracket-page__title">
                {KNOCKOUT_LABELS[activeStage] ?? "Fase"}
              </h1>
            </div>
          </div>

          <BracketProgressBar
            filled={activeView?.filledCount ?? 0}
            total={activeView?.totalSlots ?? 0}
          />
        </header>

        {error && <p className="user-bracket-page__error">{error}</p>}

        <p className="user-bracket-page__readonly-notice">
          <span className="material-symbols-outlined">visibility</span>
          Modo visualização. Palpites somente leitura.
        </p>

        <BracketSlotGrid
          slots={activeView?.slots ?? []}
          isReadOnly={true}
          onSelect={() => {}}
          onClear={() => {}}
        />
      </main>
    </>
  );
}