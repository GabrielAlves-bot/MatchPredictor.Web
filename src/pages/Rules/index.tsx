import "./styles.css";
import { useScoringRules } from "../../hooks/useScoringRules";
import { Loading } from "../../components/Loading";
import { RuleList } from "../../components/RuleList";
import { SaveBar } from "../../components/SaveBar";

export function Rules() {
  const { rules, isLoading, isSaving, error, updateRule, save } = useScoringRules();

  if (isLoading) return <Loading fullscreen text="Carregando regras..." />;

  return (
    <>
      <main className="rule-page">
        <h2 className="rule-page__title">Configurações de Regras</h2>
        <p className="rule-page__subtitle">Defina os pontos para cada tipo de acerto</p>

        {error && <p className="rule-page__error">{error}</p>}

        <RuleList rules={rules} onChange={updateRule} />
      </main>
      {isSaving && <Loading fullscreen={true} />}

      <SaveBar onSave={save} title="Salvar Regras" />
    </>
  );
}
