import "./styles.css";
import { TournamentCard } from "../../components/TournamentCard";
import { PhaseTabs } from "../../components/PhaseTabs";
import { GroupTabs } from "../../components/GroupTabs";
import { MatchList } from "../../components/MatchList";
import { SaveBar } from "../../components/SaveBar";
import { useEffect, useState } from "react";
import { MatchPhase } from "../../enums/MatchPhase";
import type { IMatch } from "../../types/MatchType";
import { getMatches } from "../../services/MatchService";
import type { IGuess } from "../../types/GuessType";
import { getGuesses, updateGuesses } from "../../services/GuessService";
import { KnockoutTabs } from "../../components/KnockoutTabs";
import { Loading } from "../../components/Loading";
import { getUniqueGroups, getKnockoutStages } from "../../helpers/helpers";

export function Predictions() {
  const [matches, setMatches] = useState<IMatch[]>([]);
  const [guesses, setGuesses] = useState<IGuess[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState<MatchPhase>(MatchPhase.GroupStage);
  const [selectedTab, setSelectedTab] = useState<string>("");

  async function loadData() {
    try {
      setIsLoading(true);
      const [matchesRes, guessesRes] = await Promise.all([
        getMatches(),
        getGuesses(1),
      ]);
      setMatches(matchesRes);
      setGuesses(guessesRes);
    } catch {
      console.error("Erro ao carregar dados");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (matches.length === 0) return;
    if (selectedPhase === MatchPhase.GroupStage) {
      setSelectedTab(getUniqueGroups(matches)[0] ?? "");
    } else {
      setSelectedTab(getKnockoutStages(matches)[0] ?? "");
    }
  }, [matches, selectedPhase]);

  function handlePhaseChange(phase: MatchPhase) {
    setSelectedPhase(phase);
    setSelectedTab("");
  }

  function handleGuessChange(matchId: number, field: "homeGoals" | "awayGoals", value: number | null) {
    setGuesses((prev) =>
      prev.map((g) => (g.matchId === matchId ? { ...g, [field]: value ?? undefined } : g))
    );
  }

  async function handleSave() {
    try {
      await updateGuesses(1, guesses)
    } catch {
      console.error("Erro ao salvar palpites");
    }
  }

  const filteredMatches = matches.filter((m) => {
    if (m.phase !== selectedPhase) return false;
    if (selectedPhase === MatchPhase.GroupStage) return m.group === selectedTab;
    return String(m.knockoutStage) === selectedTab;
  });

  const filledCount = guesses.filter(
    (g) => g.homeGoals != null && g.awayGoals != null
  ).length;

  return (
    <>
      {!isLoading && (
        <main className="predictions-page__main">
          <TournamentCard filled={filledCount} total={matches.length} />

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

          <MatchList
            matches={filteredMatches}
            guesses={guesses}
            onGuessChange={handleGuessChange}
          />
        </main>
      )}
      {isLoading && <Loading fullscreen={true} />}
      <SaveBar onSave={handleSave} />
    </>
  );
}