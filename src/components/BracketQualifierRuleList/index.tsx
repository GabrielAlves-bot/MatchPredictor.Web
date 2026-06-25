import type { IBracketQualifierRule } from "../../types/BracketQualifierRuleType";
import { BracketQualifierRuleCard } from "../BracketQualifierRuleCard";
import "./styles.css";

interface IBracketQualifierRuleListProps {
  rules: IBracketQualifierRule[];
  isEditable?: boolean;
  onChange: (id: number, changes: Partial<IBracketQualifierRule>) => void;
}

export function BracketQualifierRuleList({ rules, isEditable = false, onChange }: IBracketQualifierRuleListProps) {
  return (
    <div className="bq-rule-list">
      {rules.map((rule) => (
        <BracketQualifierRuleCard
          key={rule.id}
          rule={rule}
          isEditable={isEditable}
          onChange={onChange}
        />
      ))}
    </div>
  );
}