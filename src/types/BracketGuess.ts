import type { KnockoutStage } from "../enums/KnockoutStage";
import type { MatchPhase } from "../enums/MatchPhase";

export interface IBracketGuess {
    id: number;
    teamId: number;
    knockoutStage: KnockoutStage
    matchPhase: MatchPhase
    enabled: boolean;
    blocked?: boolean;
}