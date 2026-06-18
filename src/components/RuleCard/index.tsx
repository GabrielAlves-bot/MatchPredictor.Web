import { useState } from "react";
import { ScoringRule } from "../../enums/ScoringRule";
import type { IScoringRule } from "../../types/ScoringRuleType";
import "./styles.css";

interface RuleCardProps {
  rule: IScoringRule;
  isEditable?: boolean;
  onChange: (id: number, changes: Partial<IScoringRule>) => void;
}

const RULE_META: Record<ScoringRule, { icon: string; title: string; desc: string }> = {
  [ScoringRule.None]: {
    icon: "block",
    title: "Nenhuma",
    desc: "Regra sem pontuação.",
  },
  [ScoringRule.ExactScore]: {
    icon: "sports_soccer",
    title: "Placar Exato",
    desc: "Acerto exato do placar final da partida.",
  },
  [ScoringRule.WinnerAndWinnerGoals]: {
    icon: "military_tech",
    title: "Vencedor e Gols do Vencedor",
    desc: "Acerto do vencedor e número de gols do time vitorioso.",
  },
  [ScoringRule.WinnerAndLoserGoals]: {
    icon: "analytics",
    title: "Vencedor e Gols do Perdedor",
    desc: "Acerto do vencedor e número de gols do time que perdeu.",
  },
  [ScoringRule.WinnerOnly]: {
    icon: "emoji_events",
    title: "Vencedor ou Empate",
    desc: "Acerto exclusivo de quem venceu a partida (ou empate não exato).",
  },
  [ScoringRule.GoalCountOnly]: {
    icon: "scoreboard",
    title: "Apenas Gol de Uma das Seleções",
    desc: "Acerto apenas a quantidade de gols de uma das selecões.",
  },
};

export function RuleCard({ rule, isEditable = false, onChange }: RuleCardProps) {
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
    <div className={`rule-card${inactive ? " rule-card--inactive" : ""}`}>
      <div className="rule-card__header">
        <div className="rule-card__info">
          <div className={`rule-card__icon-box${inactive ? " rule-card__icon-box--inactive" : ""}`}>
            <span className="material-symbols-outlined">{meta.icon}</span>
          </div>
          <div>
            <h3 className="rule-card__title">{meta.title}</h3>
            <p className="rule-card__desc">{meta.desc}</p>
          </div>
        </div>

        <label className={`rule-card__switch${!isEditable ? " rule-card__switch--readonly" : ""}`}>
          <input
            type="checkbox"
            checked={rule.isActive}
            disabled={!isEditable}
            onChange={(e) => onChange(rule.id, { isActive: e.target.checked })}
          />
          <span className="rule-card__slider" />
        </label>
      </div>

      <div className="rule-card__footer">
        <div className="rule-card__points-label">
          <span className="rule-card__points-title">Valor da Pontuação</span>
        </div>

        <div className="rule-card__points-input-group">
          <input
            className="rule-card__points-input"
            type="text"
            inputMode="decimal"
            value={localPoints}
            disabled={inactive || !isEditable}
            onChange={(e) => handlePointsChange(e.target.value)}
            onBlur={handlePointsBlur}
          />
          <span className={`rule-card__points-unit${inactive ? " rule-card__points-unit--inactive" : ""}`}>
            PTS
          </span>
        </div>
      </div>
    </div>
  );
}
