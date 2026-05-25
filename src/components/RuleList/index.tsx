import "./styles.css";
import type { IScoringRule } from "../../types/ScoringRuleType";
import { RuleCard } from "../RuleCard";

interface RuleListProps {
  rules: IScoringRule[];
  isEditable?: boolean;
  onChange: (id: number, changes: Partial<IScoringRule>) => void;
}

export function RuleList({ rules, isEditable = false, onChange }: RuleListProps) {
  return (
    <div className="rule-list">
      {rules.map((rule) => (
        <RuleCard
          key={rule.id}
          rule={rule}
          isEditable={isEditable}
          onChange={onChange}
        />
      ))}
    </div>
  );
}
