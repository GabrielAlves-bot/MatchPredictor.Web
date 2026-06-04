import "./styles.css";
import { useNavigate } from "react-router-dom";
import { GuessCard } from "../../components/GuessCard";

export function MyGuesses() {
  const navigate = useNavigate();

  return (
    <main className="my-guesses-page">
      <section className="my-guesses-page__header">
        <h2 className="my-guesses-page__title">Meus Palpites</h2>
        <p className="my-guesses-page__description">
          Gerencie seus palpites para os jogos e para o chaveamento do torneio
          em um só lugar.
        </p>
      </section>

      <div className="my-guesses-page__grid">
        <GuessCard
          icon="sports_soccer"
          title="Palpites de Jogos"
          description="Defina os placares de cada partida do torneio."
          onClick={() => navigate("/Predictions")}
        />

        <GuessCard
          icon="account_tree"
          title="Palpites do Chaveamento"
          description="Selecione os times que avançam em cada fase das eliminatórias."
          onClick={() => navigate("/Bracket")}
        />
      </div>
    </main>
  );
}
