import "./styles.css";
import { TournamentCard } from "../../components/TournamentCard";
import { PhaseTabs } from "../../components/PhaseTabs";
import { GroupTabs } from "../../components/GroupTabs";
import { MatchList } from "../../components/MatchList";
import { SaveBar } from "../../components/SaveBar";

export function Predictions() {
  return (
    <>
      <main className="predictions-page__main">
        <TournamentCard />
        <PhaseTabs />
        <GroupTabs />
        <MatchList />
      </main>
      <SaveBar />
    </>
  );
}