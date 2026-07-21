import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MatchPhase } from "../../enums/MatchPhase";
import { Loading } from "../../components/Loading";
import { PhaseTabs } from "../../components/PhaseTabs";
import { RoundTabs } from "../../components/RoundTabs";
import { KnockoutTabs } from "../../components/KnockoutTabs";
import { PredictionList } from "../../components/PredictionList";
import { usePoolRanking } from "../../hooks/usePoolRanking";
import { usePool } from "../../context/PoolContext";
import { useMinimumLoading } from "../../hooks/useMinimumLoading";
import { getUniqueRounds, getKnockoutStages } from "../../helpers/helpers";
import "./styles.css";
import { useUserPredictions } from "../../hooks/useUserPredictions";
import { UserStandingCard } from "../../components/UserStandingCard";
import { BackButton } from "../../components/BackButton";

export function UserPredictions() {
  const { poolParticipantId } = useParams<{ poolParticipantId: string }>();
  const { activePool } = usePool();

  const participantId = Number(poolParticipantId);

  const { matches, guesses, isLoading, error } = useUserPredictions(participantId);
  const { ranking } = usePoolRanking(activePool?.poolId);

  const [selectedPhase, setSelectedPhase] = useState<MatchPhase>(MatchPhase.Knockout);
  const [selectedTab, setSelectedTab] = useState<string>("");

  const loading = useMinimumLoading(isLoading);

  useEffect(() => {
    if (matches.length === 0) return;
    if (selectedTab !== "") return;
    if (selectedPhase === MatchPhase.GroupStage) {
      setSelectedTab(getUniqueRounds(matches)[2] ?? "");
    } else {
      setSelectedTab(getKnockoutStages(matches)[5] ?? "");
    }
  }, [matches, selectedPhase, selectedTab]);

  function handlePhaseChange(phase: MatchPhase) {
    setSelectedPhase(phase);
    setSelectedTab("");
  }

  const filteredMatches = matches.filter((m: any) => {
    if (m.phase !== selectedPhase) return false;
    if (selectedPhase === MatchPhase.GroupStage) return String(m.round) === selectedTab;
    return String(m.knockoutStage) === selectedTab;
  });

  const participant = ranking.find(
    (r) => r.idPoolParticipant === participantId
  );

  if (loading) return <Loading fullscreen text="Carregando palpites..." />;
  if (error) return <p className="user-predictions__error">{error}</p>;

  return (
    <main className="user-predictions">
      <BackButton text="Voltar para o Menu" />

      {participant && (
        <UserStandingCard
          name={participant.userName}
          position={participant.position}
          totalPoints={participant.score}
        />
      )}

      <PhaseTabs
        selectedPhase={selectedPhase}
        onPhaseChange={handlePhaseChange}
      />

      {selectedPhase === MatchPhase.GroupStage && (
        <RoundTabs
          matches={matches}
          selectedRound={selectedTab}
          onRoundChange={setSelectedTab}
        />
      )}

      {selectedPhase === MatchPhase.Knockout && (
        <KnockoutTabs
          matches={matches}
          selectedStage={selectedTab}
          onStageChange={setSelectedTab}
        />
      )}

      <PredictionList
        readonly={true}
        matches={filteredMatches}
        guesses={guesses}
        onGuessChange={() => {}}
      />
    </main>
  );
}
