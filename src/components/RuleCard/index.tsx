import { ScoringRule } from "../../enums/ScoringRule";
import type { IScoringRule } from "../../types/ScoringRuleType";
import "./styles.css";

interface RuleCardProps {
  rule: IScoringRule;
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
    title: "Apenas Vencedor",
    desc: "Acerto exclusivo de quem venceu a partida (ou empate).",
  },
  [ScoringRule.GoalCountOnly]: {
    icon: "scoreboard",
    title: "Apenas Total de Gols",
    desc: "Acerto do somatório de gols das duas equipes.",
  },
};

export function RuleCard({ rule, onChange }: RuleCardProps) {
  const meta = RULE_META[rule.ruleType];
  const inactive = !rule.isActive;

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

        <label className="rule-card__switch">
          <input
            type="checkbox"
            checked={rule.isActive}
            onChange={(e) => onChange(rule.id, { isActive: e.target.checked })}
          />
          <span className="rule-card__slider" />
        </label>
      </div>

      <div className="rule-card__footer">
        <div className="rule-card__points-label">
          <span className="rule-card__points-title">Valor da Pontuação</span>
          {inactive && (
            <span className="rule-card__inactive-label">REGRA DESATIVADA</span>
          )}
        </div>

        <div className="rule-card__points-input-group">
          <input
            className="rule-card__points-input"
            type="number"
            min={0}
            value={rule.points}
            disabled={inactive}
            onChange={(e) => onChange(rule.id, { points: Number(e.target.value) })}
          />
          <span className={`rule-card__points-unit${inactive ? " rule-card__points-unit--inactive" : ""}`}>
            PTS
          </span>
        </div>
      </div>
    </div>
  );
}
