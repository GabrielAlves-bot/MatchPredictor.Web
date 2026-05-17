import { Loading } from "../../components/Loading";
import type { IStandingEntry } from "../../components/StandingRow";
import { StandingsHeroCard } from "../../components/StandingsHeroCard";
import { StandingsTable } from "../../components/StandingsTable";
import { useAuth } from "../../context/AuthContext";
import { usePool } from "../../context/PoolContext";
import { useMinimumLoading } from "../../hooks/useMinimumLoading";
import { usePoolRanking } from "../../hooks/usePoolRanking";
import "./styles.css";

export function Standings() {
  const { activePool } = usePool();
  const { auth } = useAuth();
  const { ranking, isLoading, error } = usePoolRanking(activePool?.poolId);
  const loading = useMinimumLoading(isLoading);

  if (loading) 
    return <Loading fullscreen text="Carregando ranking..." />;

  if (error) 
    return <p>{error}</p>;

  const entries: IStandingEntry[] = ranking.map((entry) => ({
    rank: entry.position,
    name: entry.userName,
    points: entry.score,
    isCurrentUser: entry.userName === auth?.user,
  }));

  const currentUser = entries.find((e) => e.isCurrentUser);

  return (
    <main className="standings-page">
      {currentUser && (
        <section>
          <StandingsHeroCard
            position={currentUser.rank}
            totalPoints={currentUser.points}
          />
        </section>
      )}

      <StandingsTable entries={entries} />
    </main>
  );
}