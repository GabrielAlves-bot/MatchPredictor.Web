import type { KnockoutStage } from "../enums/KnockoutStage";
import type { MatchPhase } from "../enums/MatchPhase";

export interface IBracketGuessDeadline {
    id: number,
    championshipId: string;
    matchPhase: MatchPhase;
    knockoutStage?: KnockoutStage;
    deadLine?: Date;
}