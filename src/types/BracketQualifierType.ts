import type { KnockoutStage } from "../enums/KnockoutStage";
import type { MatchPhase } from "../enums/MatchPhase";

export interface IBracketQualifier {
    id: number;
    teamId?: number | null;
    knockoutStage: KnockoutStage;
    matchPhase: MatchPhase;
}