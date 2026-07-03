import "./styles.css";
import { PhaseTabs } from "../../components/PhaseTabs";
import { RoundTabs } from "../../components/RoundTabs";
import { MatchList } from "../../components/MatchList";
import { SaveBar } from "../../components/SaveBar";
import { getMatches, updateMatches } from "../../services/MatchService";
import type { IMatch } from "../../types/MatchType";
import { useEffect, useState } from "react";
import { Loading } from "../../components/Loading";
import { MatchPhase } from "../../enums/MatchPhase";
import { MatchStatus } from "../../enums/MatchStatus";
import { KnockoutTabs } from "../../components/KnockoutTabs";
import { getKnockoutStages, getUniqueRounds } from "../../helpers/helpers";
import { useMinimumLoading } from "../../hooks/useMinimumLoading";
import { useAuth } from "../../context/AuthContext";
import { settle } from "../../services/PoolService";
import { usePool } from "../../context/PoolContext";
import { useNavigate } from "react-router-dom";
import paths from "../../routes/paths";

export function Matches() {
  const [matches, setMatches] = useState<IMatch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState<MatchPhase>(MatchPhase.Knockout);
  const [selectedTab, setSelectedTab] = useState<string>("");

  const { auth } = useAuth();
  const { activePool } = usePool();
  const isAdmin = auth?.role === "Admin";
  const navigate = useNavigate();

  async function loadMatches() {
    try {
      setIsLoading(true);
      const response = await getMatches();
      setMatches(response);
    } catch {
      console.error("Erro ao carregar partidas");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadMatches();
  }, []);

  useEffect(() => {
    if (matches.length === 0)
      return;

    if (selectedTab !== "")
      return;

    if (selectedPhase === MatchPhase.GroupStage) {
      setSelectedTab(getUniqueRounds(matches)[2] ?? "");
    } else {
      setSelectedTab(getKnockoutStages(matches)[1] ?? "");
    }
  }, [matches, selectedPhase, selectedTab]);

  function handlePhaseChange(phase: MatchPhase) {
    setSelectedPhase(phase);
    setSelectedTab("");
  }

  function handleGoalChange(
    matchId: number,
    field: "homeGoals" | "awayGoals",
    value: number | null
  ) {
    setMatches((prev) =>
      prev.map((m) =>
        m.id === matchId ? { ...m, [field]: value ?? undefined } : m
      )
    );
  }

  function handleStatusChange(matchId: number, status: MatchStatus) {
    setMatches((prev) =>
      prev.map((m) => (m.id === matchId ? { ...m, status } : m))
    );
  }

  async function handleSave() {
    try {
      setIsLoading(true);
      await updateMatches(matches);
      settle(activePool?.poolId);
    } catch {
      console.error("Erro ao salvar partidas");
    } finally {
      setIsLoading(false);
    }
  }

  function handleMatchClick(matchId: number) {
    navigate(paths.matchGuesses.replace(":matchId", String(matchId)));
  }

  const filteredMatches = matches.filter((m) => {
    if (m.phase !== selectedPhase)
      return false;

    if (selectedPhase === MatchPhase.GroupStage)
      return String(m.round) === selectedTab;

    return String(m.knockoutStage) === selectedTab;
  });

  const loading = useMinimumLoading(isLoading);

  return (
    <>
      {!loading && (
        <main className="predictions-page__main">
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

          <MatchList
            matches={filteredMatches}
            isEditable={isAdmin}
            onGoalChange={isAdmin ? handleGoalChange : undefined}
            onStatusChange={isAdmin ? handleStatusChange : undefined}
            onMatchClick={handleMatchClick}
          />
        </main>
      )}

      {loading && <Loading fullscreen={true} />}

      {isAdmin && <SaveBar onSave={handleSave} title="Salvar Partidas" />}
    </>
  );
}