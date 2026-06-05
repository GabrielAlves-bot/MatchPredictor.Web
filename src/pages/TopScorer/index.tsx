import "./styles.css";
import { useTopScorerGuess } from "../../hooks/useTopScorerGuess";
import { Loading } from "../../components/Loading";
import { TopScorerCard } from "../../components/TopScorerCard";
import { usePool } from "../../context/PoolContext";
import { BackButton } from "../../components/BackButton";


export function TopScorer() {
  const { activePool } = usePool();
  const { playerName, isLoading, isSaving, error, setPlayerName, save } =
    useTopScorerGuess(activePool?.poolParticipantId ?? 0);

  if (isLoading)
    return <Loading fullscreen text="Carregando palpite..." />;

  return (
    <main className="top-scorer-page">
            <BackButton text="Voltar para menu de palpites" />
      
      <section className="top-scorer-page__header">
        <h2 className="top-scorer-page__title">Artilheiro do Torneio</h2>
        <p className="top-scorer-page__description">
          Escolha o jogador que você acredita que será o artilheiro do torneio.
        </p>
      </section>

      <TopScorerCard
        playerName={playerName}
        isSaving={isSaving}
        onChange={setPlayerName}
        onSave={save}
      />
    </main>
  );
}
