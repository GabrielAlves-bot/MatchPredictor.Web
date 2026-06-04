import type { KnockoutStage } from "../enums/KnockoutStage";
import type { MatchPhase } from "../enums/MatchPhase";
import type { ITeam } from "./TeamType";

export interface IGroupMatch {
  group: string | null;
  phase: MatchPhase;
  knockoutStage: KnockoutStage | null;
  teams: ITeam[];
}