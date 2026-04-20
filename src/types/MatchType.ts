import type { KnockoutStage } from "../enums/KnockoutStage";
import type { MatchPhase } from "../enums/MatchPhase";
import type { MatchStatus } from "../enums/MatchStatus";
import type { ITeam } from "./TeamType";

export interface IMatch {
  id: number;
  homeTeam: ITeam;
  awayTeam: ITeam;
  date: string;
  stadium: string;
  city: string;
  status: MatchStatus
  homeGoals : number
  awayGoals: number;
  phase: MatchPhase
  group?: string; 
  knockoutStage : KnockoutStage;
  saved: boolean;
}