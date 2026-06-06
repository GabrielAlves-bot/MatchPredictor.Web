import { KnockoutStage } from "../enums/KnockoutStage";

const KNOCKOUT_LABELS: Record<number, string> = {
  [KnockoutStage.RoundOf32]: "Segunda Fase",
  [KnockoutStage.RoundOf16]: "Oitavas",
  [KnockoutStage.QuarterFinal]: "Quartas",
  [KnockoutStage.SemiFinal]: "Semifinal",
  [KnockoutStage.ThirdPlaceMatch]: "Disputa 3º Lugar",
  [KnockoutStage.Final]: "Final",
  [KnockoutStage.Champion]: "Campeão",
};

export default KNOCKOUT_LABELS;