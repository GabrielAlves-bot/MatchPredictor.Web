import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";
import { getMatchById } from "../../services/MatchService";
import { getGuessesByMatch } from "../../services/GuessService";
import type { IMatch } from "../../types/MatchType";
import type { IGuessDetails } from "../../types/GuessDetails";
import { Loading } from "../../components/Loading";
import { MatchHeroCard } from "../../components/MatchHeroCard";
import { GuessDetailsCard } from "../../components/GuessDetailsCard";
import { usePool } from "../../context/PoolContext";
import { useMinimumLoading } from "../../hooks/useMinimumLoading";
import { BackButton } from "../../components/BackButton";

export function MatchGuesses() {
  const { matchId } = useParams<{ matchId: string }>();
  const { activePool } = usePool();

  const [match, setMatch] = useState<IMatch | null>(null);
  const [guesses, setGuesses] = useState<IGuessDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortAlpha, setSortAlpha] = useState(false);

  const loading = useMinimumLoading(isLoading);

  const displayedGuesses = useMemo(() => {
    if (!sortAlpha) return guesses;
    return [...guesses].sort((a, b) => a.userName.localeCompare(b.userName, "pt-BR"));
  }, [guesses, sortAlpha]);

  useEffect(() => {
    async function loadData() {
      if (!matchId || !activePool?.poolId) return;

      try {
        setIsLoading(true);
        setError(null);

        const [matchRes, guessesRes] = await Promise.all([
          getMatchById(Number(matchId)),
          getGuessesByMatch(activePool.poolId, Number(matchId)),
        ]);

        setMatch(matchRes);
        setGuesses(guessesRes);
      } catch {
        setError("Erro ao carregar os dados da partida.");
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [matchId, activePool?.poolId]);

  if (loading) return <Loading fullscreen text="Carregando palpites..." />;

  if (error) return <p className="match-guesses-page__error">{error}</p>;

  if (!match) return null;

  const totalParticipants = guesses.length;
  const withGuess = guesses.filter(
    (g) => g.homeGoals != null && g.awayGoals != null
  ).length;
  const avgScore =
    totalParticipants > 0
      ? (guesses.reduce((sum, g) => sum + g.score, 0) / totalParticipants).toFixed(1)
      : "–";

  return (
    <main className="match-guesses-page">
      <BackButton text="Voltar para partidas" />

      <MatchHeroCard match={match} />

      <div className="match-guesses-page__stats">
        <div className="match-guesses-page__stat">
          <span className="match-guesses-page__stat-value">{totalParticipants}</span>
          <span className="match-guesses-page__stat-label">Participantes</span>
        </div>
        <div className="match-guesses-page__stat">
          <span className="match-guesses-page__stat-value">{withGuess}</span>
          <span className="match-guesses-page__stat-label">Palpitaram</span>
        </div>
        <div className="match-guesses-page__stat">
          <span className="match-guesses-page__stat-value">{avgScore}</span>
          <span className="match-guesses-page__stat-label">Média pts</span>
        </div>
      </div>

      <div className="match-guesses-page__list-header">
        <h2 className="match-guesses-page__list-title">Palpites do Bolão</h2>
        <div className="match-guesses-page__list-actions">
          <span className="match-guesses-page__list-count">{withGuess}/{totalParticipants}</span>
          <button
            className={`match-guesses-page__sort-btn${sortAlpha ? " match-guesses-page__sort-btn--active" : ""}`}
            onClick={() => setSortAlpha((prev) => !prev)}
            title={sortAlpha ? "Ordem padrão" : "Ordenar A–Z"}
          >
            <span className="material-symbols-outlined">sort_by_alpha</span>
          </button>
        </div>
      </div>

      {guesses.length === 0 ? (
        <p className="match-guesses-page__empty">Nenhum palpite disponível para esta partida.</p>
      ) : (
        <div className="match-guesses-page__list">
          {displayedGuesses.map((guess) => (
            <GuessDetailsCard key={guess.userName} guess={guess} />
          ))}
        </div>
      )}
    </main>
  );
}