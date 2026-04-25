import KNOCKOUT_LABELS from "../../constants/KnockoutLabels";
import { getKnockoutStages } from "../../helpers/helpers";
import type { IMatch } from "../../types/MatchType";

interface IProps {
  matches: IMatch[];
  selectedStage: string;
  onStageChange: (stage: string) => void;
}

export function KnockoutTabs({ matches, selectedStage, onStageChange }: IProps) {
  const stages = getKnockoutStages(matches);

  return (
    <nav className="group-tabs">
      {stages.map((stage) => (
        <button
          key={stage}
          className={`group-tabs__btn${selectedStage === stage ? " group-tabs__btn--active" : ""}`}
          onClick={() => onStageChange?.(stage)}
        >
          {KNOCKOUT_LABELS[Number(stage)] ?? stage}
        </button>
      ))}
    </nav>
  );
}