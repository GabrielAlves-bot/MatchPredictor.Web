import "./styles.css";
import { useBracketGuessDeadlines } from "../../hooks/useBracketGuessDeadlines";
import { Loading } from "../../components/Loading";
import { BracketDeadlineList } from "../../components/BracketDeadlineList";
import { SaveBar } from "../../components/SaveBar";
import { useAuth } from "../../context/AuthContext";

interface BracketDeadlineProps {
  championshipId: number;
}

export function BracketDeadline({ championshipId }: BracketDeadlineProps) {
  const { deadlines, isLoading, isSaving, error, updateDeadline, save } =
    useBracketGuessDeadlines(championshipId);

  const { auth } = useAuth();
  const isAdmin = auth?.role === "Admin";

  if (isLoading)
    return <Loading fullscreen text="Carregando prazos do chaveamento..." />;

  return (
    <>
      <main className="bracket-deadline-page">
        <section className="bracket-deadline-page__header">
          <h2 className="bracket-deadline-page__title">Prazos do Chaveamento</h2>
          <p className="bracket-deadline-page__description">
            {isAdmin
              ? "Defina a data e hora limite para o envio de palpites para cada fase do chaveamento do torneio."
              : "Consulte a data e hora limite para o envio de palpites para cada fase do chaveamento do torneio."}
          </p>
        </section>

        {error && <p className="bracket-deadline-page__error">{error}</p>}

        <BracketDeadlineList
          deadlines={deadlines}
          isEditable={isAdmin}
          onChange={updateDeadline}
        />
      </main>

      {isSaving && <Loading fullscreen />}

      {isAdmin && <SaveBar onSave={save} title="Salvar Prazos do Chaveamento" />}
    </>
  );
}
