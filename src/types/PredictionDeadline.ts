import type { KnockoutStage } from "../enums/KnockoutStage";
import type { MatchPhase } from "../enums/MatchPhase";

export interface IPredictionDeadline {
    id: number,
    championshipId: string;
    matchPhase: MatchPhase;
    knockoutStage?: KnockoutStage;
    round?: number;
    deadLine?: Date;
}