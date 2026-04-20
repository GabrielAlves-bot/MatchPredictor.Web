import { KnockoutStage } from "../../enums/KnockoutStage";
import { getKnockoutStages } from "../../helpers/helpers";
import type { IMatch } from "../../types/MatchType";

const KNOCKOUT_LABELS: Record<number, string> = {
  [KnockoutStage.RoundOf32]: "Segunda Fase",
  [KnockoutStage.RoundOf16]: "Oitavas",
  [KnockoutStage.QuarterFinal]: "Quartas",
  [KnockoutStage.SemiFinal]: "Semifinal",
  [KnockoutStage.Final]: "Final",
};

interface IKnockoutTabsProps {
  matches: IMatch[];
  selectedStage: string;
  onStageChange: (stage: string) => void;
}

export function KnockoutTabs({ matches, selectedStage, onStageChange }: IKnockoutTabsProps) {
  const stages = getKnockoutStages(matches);

  return (
    <nav className="group-tabs">
      {stages.map((stage) => (
        <button
          key={stage}
          className={`group-tabs__btn${selectedStage === stage ? " group-tabs__btn--active" : ""}`}
          onClick={() => onStageChange(stage)}
        >
          {KNOCKOUT_LABELS[Number(stage)] ?? stage}
        </button>
      ))}
    </nav>
  );
}