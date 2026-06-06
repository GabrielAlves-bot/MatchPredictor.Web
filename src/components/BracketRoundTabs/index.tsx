import "./styles.css";
import { KnockoutStage } from "../../enums/KnockoutStage";
import type { StageView } from "../../hooks/useBracket";

interface BracketRoundTabsProps {
  stages: StageView[];
  activeStage: KnockoutStage;
  onStageChange: (stage: KnockoutStage) => void;
}

export function BracketRoundTabs({ stages, activeStage, onStageChange }: BracketRoundTabsProps) {
  return (
    <div className="bracket-round-tabs">
      <div className="bracket-round-tabs__scroll">
        {stages.map((s) => (
          <button
            key={s.stage}
            className={[
              "bracket-round-tabs__btn",
              s.stage === activeStage ? "bracket-round-tabs__btn--active" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => onStageChange(s.stage)}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}