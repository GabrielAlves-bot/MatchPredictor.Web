import "./styles.css";
import { PhaseTabs } from "../../components/PhaseTabs";
import { GroupTabs } from "../../components/GroupTabs";
import { MatchList } from "../../components/MatchList";
import { get } from "../../services/MatchService";
import type { IMatch } from "../../types/MatchType";
import { useEffect, useState } from "react";
import { Loading } from "../../components/Loading";

export function Matches() {

  const [matches, setMatches] = useState<IMatch[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function loadMatches() {
    try {
      setIsLoading(true);
      const response = await get();
      setMatches(response);
    }
    catch {
      console.log("error")
    }
    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadMatches();
  }, [])

  return (
    <>
      {!isLoading && (
        <main className="predictions-page__main">
          <PhaseTabs />
          <GroupTabs matches={matches}  />
          <MatchList matches={matches} />
        </main>
      )}

      {isLoading && <Loading fullscreen={true} />}
    </>
  );
}