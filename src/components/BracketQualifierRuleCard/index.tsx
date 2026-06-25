import { useState } from "react";
import { QualifierRule } from "../../enums/QualifierRule";
import type { IBracketQualifierRule } from "../../types/BracketQualifierRuleType";
import "./styles.css";

interface IBracketQualifierRuleCardProps {
  rule: IBracketQualifierRule;
  isEditable?: boolean;
  onChange: (id: number, changes: Partial<IBracketQualifierRule>) => void;
}

const RULE_META: Record<QualifierRule, { icon: string; title: string; desc: string }> = {
  [QualifierRule.None]: {
    icon: "block",
    title: "Nenhuma",
    desc: "Regra sem pontuação extra.",
  },
  [QualifierRule.RoundOf32Points]: {
    icon: "grid_view",
    title: "Segunda Fase",
    desc: "Pontos por acertar os classificados para as oitavas de final.",
  },
  [QualifierRule.RoundOf16Points]: {
    icon: "table_chart",
    title: "Oitavas de Final",
    desc: "Pontos por acertar os classificados para as oitavas de final.",
  },
    [QualifierRule.QuarterFinalPoints]: {
    icon: "table_chart",
    title: "Quartas de Final",
    desc: "Pontos por acertar os classificados para as quartas de final.",
  },
  [QualifierRule.SemiFinalPoints]: {
    icon: "call_merge",
    title: "Semifinal",
    desc: "Pontos por acertar os classificados para a semifinal.",
  },
  [QualifierRule.FinalPoints]: {
    icon: "merge",
    title: "Final",
    desc: "Pontos por acertar os finalistas.",
  },
  [QualifierRule.ChampionPoints]: {
    icon: "trophy",
    title: "Campeão",
    desc: "Pontos por acertar o campeão do torneio.",
  },
};

export function BracketQualifierRuleCard({ rule, isEditable = false, onChange }: IBracketQualifierRuleCardProps) {
  const meta = RULE_META[rule.ruleType];
  const inactive = !rule.isActive;

  const [localPoints, setLocalPoints] = useState<string>(String(rule.points));

  function handlePointsChange(raw: string) {
    if (raw === "" || raw === "-") {
      setLocalPoints(raw);
      return;
    }
    if (/^\d*\.?\d*$/.test(raw)) {
      setLocalPoints(raw);
      const parsed = parseInt(raw);
      if (!isNaN(parsed)) {
        onChange(rule.id, { points: parsed });
      }
    }
  }

  function handlePointsBlur() {
    const parsed = parseInt(localPoints);
    const safe = isNaN(parsed) || parsed < 0 ? 0 : parsed;
    setLocalPoints(String(safe));
    onChange(rule.id, { points: safe });
  }

  return (
    <div className={`bq-rule-card${inactive ? " bq-rule-card--inactive" : ""}`}>
      <div className="bq-rule-card__header">
        <div className="bq-rule-card__info">
          <div className={`bq-rule-card__icon-box${inactive ? " bq-rule-card__icon-box--inactive" : ""}`}>
            <span className="material-symbols-outlined">{meta.icon}</span>
          </div>
          <div>
            <h3 className="bq-rule-card__title">{meta.title}</h3>
            <p className="bq-rule-card__desc">{meta.desc}</p>
          </div>
        </div>

        <label className={`bq-rule-card__switch${!isEditable ? " bq-rule-card__switch--readonly" : ""}`}>
          <input
            type="checkbox"
            checked={rule.isActive}
            disabled={!isEditable}
            onChange={(e) => onChange(rule.id, { isActive: e.target.checked })}
          />
          <span className="bq-rule-card__slider" />
        </label>
      </div>

      <div className="bq-rule-card__footer">
        <span className="bq-rule-card__points-title">Valor da Pontuação</span>

        <div className="bq-rule-card__points-input-group">
          <input
            className="bq-rule-card__points-input"
            type="text"
            inputMode="decimal"
            value={localPoints}
            disabled={inactive || !isEditable}
            onChange={(e) => handlePointsChange(e.target.value)}
            onBlur={handlePointsBlur}
          />
          <span className={`bq-rule-card__points-unit${inactive ? " bq-rule-card__points-unit--inactive" : ""}`}>
            PTS
          </span>
        </div>
      </div>
    </div>
  );
}