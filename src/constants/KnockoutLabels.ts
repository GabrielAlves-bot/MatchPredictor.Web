import { KnockoutStage } from "../enums/KnockoutStage";

const KNOCKOUT_LABELS: Record<number, string> = {
  [KnockoutStage.RoundOf32]: "Segunda Fase",
  [KnockoutStage.RoundOf16]: "Oitavas",
  [KnockoutStage.QuarterFinal]: "Quartas",
  [KnockoutStage.SemiFinal]: "Semifinal",
  [KnockoutStage.Final]: "Final",
};

export default KNOCKOUT_LABELS;