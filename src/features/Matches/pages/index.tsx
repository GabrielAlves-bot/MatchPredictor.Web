import "./styles.css";
import { PhaseTabs } from "../../../components/PhaseTabs";
import { GroupTabs } from "../../../components/GroupTabs";
import { MatchList } from "../../../components/MatchList";

export function Matches() {
  return (
    <>
      <main className="predictions-page__main">
        <PhaseTabs />
        <GroupTabs />
        <MatchList />
      </main>
    </>
  );
}