import "./styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { GuessCard } from "../../components/GuessCard";
import { UserStandingCard } from "../../components/UserStandingCard";
import { usePoolRanking } from "../../hooks/usePoolRanking";
import { usePool } from "../../context/PoolContext";
import { Loading } from "../../components/Loading";

export function UserGuesses() {
  const navigate = useNavigate();
  const { poolParticipantId } = useParams<{ poolParticipantId: string }>();
  const { activePool } = usePool();
  const { ranking, isLoading } = usePoolRanking(activePool?.poolId);

  const id = Number(poolParticipantId);

  if (isLoading)
    return <Loading fullscreen text="Carregando participante..." />;

  const participant = ranking.find((e) => e.idPoolParticipant === id);

  return (
    <main className="user-guesses-page">
      {participant && (
        <section className="user-guesses-page__hero">
          <UserStandingCard
            name={participant.userName}
            position={participant.position}
            totalPoints={participant.score}
          />
        </section>
      )}

      <section className="user-guesses-page__header">
        <h2 className="user-guesses-page__title">Palpites</h2>
        <p className="user-guesses-page__description">
          Veja os palpites deste participante para jogos, pontos extra e artilheiro do torneio.
        </p>
      </section>

      <div className="user-guesses-page__grid">
        <GuessCard
          icon="emoji_events"
          title="Palpites de Jogos"
          description="Placares palpitados para cada partida do torneio."
          readonly = {true}
          onClick={() => navigate(`/User-Predictions/${id}`)}
        />

        <GuessCard
          icon="account_tree"
          title="Palpites Pontos Extra"
          description="Times selecionados para avançar em cada fase das eliminatórias."
          readonly = {true}
          onClick={() => navigate(`/User-Bracket-Predictions/${id}`)}
        />

        <GuessCard
          icon="sports_soccer"
          title="Artilheiro do Torneio"
          description="Jogador indicado como artilheiro do torneio."
          readonly = {true}
          onClick={() => navigate(`/User-Top-Scorer-Predictions/${id}`)}
        />
      </div>
    </main>
  );
}