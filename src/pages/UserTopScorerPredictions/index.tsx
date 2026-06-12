import { useParams } from "react-router-dom";
import { Loading } from "../../components/Loading";
import { TopScorerCard } from "../../components/TopScorerCard";
import { useTopScorerGuess } from "../../hooks/useTopScorerGuess";
import { BackButton } from "../../components/BackButton";
import "./styles.css";

export function UserTopScorerPredictions() {
  const { poolParticipantId } = useParams<{ poolParticipantId: string }>();
  const id = Number(poolParticipantId);

  const { playerName, isLoading } = useTopScorerGuess(id);

  if (isLoading)
    return <Loading fullscreen text="Carregando palpite..." />;

  return (
    <main className="user-top-scorer-page">
      <BackButton text="Voltar para palpites do participante" />

      <section className="user-top-scorer-page__header">
        <h2 className="user-top-scorer-page__title">Artilheiro do Torneio</h2>
        <p className="user-top-scorer-page__description">
          Jogador indicado como artilheiro do torneio por este participante.
        </p>
      </section>

      <p className="user-top-scorer-page__readonly-notice">
        <span className="material-symbols-outlined">visibility</span>
        Modo visualização. Palpites somente leitura.
      </p>

      <TopScorerCard
        playerName={playerName}
        isSaving={false}
        isReadonly={true}
        onChange={() => {}}
        onSave={() => {}}
      />
    </main>
  );
}