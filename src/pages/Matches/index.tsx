import "./styles.css";
import { PhaseTabs } from "../../components/PhaseTabs";
import { GroupTabs } from "../../components/GroupTabs";
import { MatchList } from "../../components/MatchList";
import { get } from "../../services/MatchService";
import type { IMatch } from "../../types/MatchType";
import { useEffect, useState } from "react";
import { Loading } from "../../components/Loading";
import { MatchPhase } from "../../enums/MatchPhase";
import { KnockoutTabs } from "../../components/KnockoutTabs";
import { getKnockoutStages, getUniqueGroups } from "../../helpers/helpers";

export function Matches() {
  const [matches, setMatches] = useState<IMatch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState<MatchPhase>(MatchPhase.GroupStage);
  const [selectedTab, setSelectedTab] = useState<string>("");

  async function loadMatches() {
    try {
      setIsLoading(true);
      const response = await get();
      setMatches(response);
    } catch {
      console.log("error");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadMatches();
  }, []);

  // Resetar aba interna ao trocar de fase
  function handlePhaseChange(phase: MatchPhase) {
    setSelectedPhase(phase);
    setSelectedTab("");
  }

  // Derivar aba padrão assim que matches carregar
  useEffect(() => {
    if (matches.length === 0) return;
    if (selectedPhase === MatchPhase.GroupStage) {
      const groups = getUniqueGroups(matches);
      setSelectedTab(groups[0] ?? "");
    } else {
      const stages = getKnockoutStages(matches);
      setSelectedTab(stages[0] ?? "");
    }
  }, [matches, selectedPhase]);

  const filteredMatches = matches.filter((m) => {
    if (m.phase !== selectedPhase) return false;
    if (selectedPhase === MatchPhase.GroupStage) return m.group === selectedTab;
    return String(m.knockoutStage) === selectedTab;
  });

  return (
    <>
      {!isLoading && (
        <main className="predictions-page__main">
          <PhaseTabs selectedPhase={selectedPhase} onPhaseChange={handlePhaseChange} />

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

          <MatchList matches={filteredMatches} />
        </main>
      )}
      {isLoading && <Loading fullscreen={true} />}
    </>
  );
}