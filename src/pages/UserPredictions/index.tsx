import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MatchPhase } from "../../enums/MatchPhase";
import { Loading } from "../../components/Loading";
import { PhaseTabs } from "../../components/PhaseTabs";
import { GroupTabs } from "../../components/GroupTabs";
import { KnockoutTabs } from "../../components/KnockoutTabs";
import { PredictionList } from "../../components/PredictionList";
import { usePoolRanking } from "../../hooks/usePoolRanking";
import { usePool } from "../../context/PoolContext";
import { useMinimumLoading } from "../../hooks/useMinimumLoading";
import { getUniqueGroups, getKnockoutStages } from "../../helpers/helpers";
import "./styles.css";
import { useUserPredictions } from "../../hooks/useUserPredictions";
import { UserStandingCard } from "../../components/UserStandingCard";

export function UserPredictions() {
  const { poolParticipantId } = useParams<{ poolParticipantId: string }>();
  const navigate = useNavigate();
  const { activePool } = usePool();

  const participantId = Number(poolParticipantId);

  const { matches, guesses, isLoading, error } = useUserPredictions(participantId);
  const { ranking } = usePoolRanking(activePool?.poolId);

  const [selectedPhase, setSelectedPhase] = useState<MatchPhase>(MatchPhase.GroupStage);
  const [selectedTab, setSelectedTab] = useState<string>("");

  const loading = useMinimumLoading(isLoading);

  // Inicializa a tab ao carregar as partidas ou trocar de fase
  useEffect(() => {
    if (matches.length === 0) return;
    if (selectedTab !== "") return;
    if (selectedPhase === MatchPhase.GroupStage) {
      setSelectedTab(getUniqueGroups(matches)[0] ?? "");
    } else {
      setSelectedTab(getKnockoutStages(matches)[0] ?? "");
    }
  }, [matches, selectedPhase, selectedTab]);

  function handlePhaseChange(phase: MatchPhase) {
    setSelectedPhase(phase);
    setSelectedTab("");
  }

  const filteredMatches = matches.filter((m: any) => {
    if (m.phase !== selectedPhase) return false;
    if (selectedPhase === MatchPhase.GroupStage) return m.group === selectedTab;
    return String(m.knockoutStage) === selectedTab;
  });

  // Encontra o participante no ranking para exibir nome e posição
  const participant = ranking.find(
    (r) => r.idPoolParticipant === participantId
  );

  if (loading) return <Loading fullscreen text="Carregando palpites..." />;
  if (error) return <p className="user-predictions__error">{error}</p>;

  return (
    <main className="user-predictions">
      {/* Navegação de volta */}
      <div className="user-predictions__back">
        <button
          className="user-predictions__back-btn"
          onClick={() => navigate(-1)}
        >
          <span className="material-symbols-outlined">chevron_left</span>
          Voltar para Classificação
        </button>
      </div>

      {/* Hero card do participante */}
      {participant && (
        <UserStandingCard
          name={participant.userName}
          position={participant.position}
          totalPoints={participant.score}
        />
      )}

      {/* Filtros de fase e tab */}
      <PhaseTabs
        selectedPhase={selectedPhase}
        onPhaseChange={handlePhaseChange}
      />

      {selectedPhase === MatchPhase.GroupStage && (
        <GroupTabs
          matches={matches}
          selectedGroup={selectedTab}
          onGroupChange={setSelectedTab}
        />
      )}

      {selectedPhase === MatchPhase.Knockout && (
        <KnockoutTabs
          matches={matches}
          selectedStage={selectedTab}
          onStageChange={setSelectedTab}
        />
      )}

      {/* Lista de palpites — read-only: sem onGuessChange */}
      <PredictionList
        matches={filteredMatches}
        guesses={guesses}
        onGuessChange={() => {}}
      />
    </main>
  );
}
