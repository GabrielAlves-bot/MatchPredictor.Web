import "./styles.css";
import { useBracketQualifierRules } from "../../hooks/useBracketQualifierRules";
import { Loading } from "../../components/Loading";
import { BracketQualifierRuleList } from "../../components/BracketQualifierRuleList";
import { SaveBar } from "../../components/SaveBar";
import { useAuth } from "../../context/AuthContext";
import { useMinimumLoading } from "../../hooks/useMinimumLoading";
import { BackButton } from "../../components/BackButton";

export function BracketQualifierRules() {
  const { rules, isLoading, isSaving, error, updateRule, save } = useBracketQualifierRules();
  const { auth } = useAuth();
  const isAdmin = auth?.role === "Admin";

  const loading = useMinimumLoading(isLoading);
  const saving = useMinimumLoading(isSaving);

  if (loading)
    return <Loading fullscreen text="Carregando regras de pontos extras..." />;

  return (
    <>
      <main className="bq-rule-page">
        <BackButton text="Voltar para Configurações" />

        <h2 className="bq-rule-page__title">Pontos Extras — Fases Eliminatórias</h2>
        <p className="bq-rule-page__subtitle">
          {isAdmin
            ? "Defina os pontos para cada fase eliminatória acertada"
            : "Visualize as regras de pontos extras configuradas"}
        </p>

        {error && <p className="bq-rule-page__error">{error}</p>}

        <BracketQualifierRuleList
          rules={rules}
          isEditable={isAdmin}
          onChange={updateRule}
        />
      </main>

      {saving && <Loading fullscreen text="Salvando regras..." />}

      {isAdmin && <SaveBar onSave={save} title="Salvar Regras" />}
    </>
  );
}