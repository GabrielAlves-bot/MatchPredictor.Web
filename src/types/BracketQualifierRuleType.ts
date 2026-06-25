import type { QualifierRule  } from "../enums/QualifierRule";

export interface IBracketQualifierRule {
    id: number,
    poolId: string;
    ruleType: QualifierRule;
    points: number;
    isActive: boolean;
}