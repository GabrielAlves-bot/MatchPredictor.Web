import "./styles.css";
import { usePredictionDeadlines } from "../../hooks/usePredictionDeadlines";
import { Loading } from "../../components/Loading";
import { DeadlineList } from "../../components/DeadlineList";
import { SaveBar } from "../../components/SaveBar";
import { useAuth } from "../../context/AuthContext";
import { useMinimumLoading } from "../../hooks/useMinimumLoading";
import { BackButton } from "../../components/BackButton";

interface DeadlineProps {
  championshipId: number;
}

export function Deadline({ championshipId }: DeadlineProps) {
  const { deadlines, isLoading, isSaving, error, updateDeadline, save } =
    usePredictionDeadlines(championshipId);

  const { auth } = useAuth();
  const isAdmin = auth?.role === "Admin";

  const loading = useMinimumLoading(isLoading);
  const saving = useMinimumLoading(isSaving);

  if (loading)
    return <Loading fullscreen text="Carregando prazos..." />;

  return (
    <>
      <main className="deadline-page">
        <BackButton text="Voltar para Menu de Palpites" />

        <section className="deadline-page__header">
          <h2 className="deadline-page__title">Prazos das Rodadas</h2>
          <p className="deadline-page__description">
            {isAdmin
              ? "Defina a data e hora limite para o envio de palpites de cada fase do torneio."
              : "Consulte a data e hora limite para o envio de palpites de cada fase do torneio."}
          </p>
        </section>

        {error && <p className="deadline-page__error">{error}</p>}

        <DeadlineList
          deadlines={deadlines}
          isEditable={isAdmin}
          onChange={updateDeadline}
        />
      </main>

      {saving && <Loading fullscreen />}

      {isAdmin && <SaveBar onSave={save} title="Salvar Prazos" />}
    </>
  );
}
