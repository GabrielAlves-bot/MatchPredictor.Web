import type { ScoringRule } from "../enums/ScoringRule";

export interface IScoringRule {
    id: number,
    poolId: string;
    ruleType: ScoringRule;
    points: number;
    isActive: boolean;
}