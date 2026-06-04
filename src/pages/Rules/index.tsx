import "./styles.css";
import { useScoringRules } from "../../hooks/useScoringRules";
import { Loading } from "../../components/Loading";
import { RuleList } from "../../components/RuleList";
import { SaveBar } from "../../components/SaveBar";
import { useAuth } from "../../context/AuthContext";
import { useMinimumLoading } from "../../hooks/useMinimumLoading";
import { BackButton } from "../../components/BackButton";

export function Rules() {
  const { rules, isLoading, isSaving, error, updateRule, save } = useScoringRules();
  const { auth } = useAuth();
  const isAdmin = auth?.role === "Admin";

  const loading = useMinimumLoading(isLoading);
  const saving = useMinimumLoading(isSaving);

  if (loading)
    return <Loading fullscreen text="Carregando regras..." />;

  return (
    <>
      <main className="rule-page">
        <BackButton text="Voltar para Menu de Palpites" />

        <h2 className="rule-page__title">Configurações de Regras</h2>
        <p className="rule-page__subtitle">
          {isAdmin
            ? "Defina os pontos para cada tipo de acerto"
            : "Visualize as regras de pontuação configuradas"}
        </p>

        {error && <p className="rule-page__error">{error}</p>}

        <RuleList
          rules={rules}
          isEditable={isAdmin}
          onChange={updateRule}
        />
      </main>

      {saving && <Loading fullscreen text="Salvando Regras..." />}

      {isAdmin && <SaveBar onSave={save} title="Salvar Regras" />}
    </>
  );
}
