import "./styles.css";
import type { IBracketGuessDeadline } from "../../types/BracketGuessDeadlineType";
import { BracketDeadlineCard } from "../BracketDeadlineCard";

interface BracketDeadlineListProps {
  deadlines: IBracketGuessDeadline[];
  isEditable?: boolean;
  onChange: (id: number, deadLine: Date) => void;
}

export function BracketDeadlineList({
  deadlines,
  isEditable = false,
  onChange,
}: BracketDeadlineListProps) {
  return (
    <div className="bracket-deadline-list">
      {deadlines.map((deadline) => (
        <BracketDeadlineCard
          key={deadline.id}
          deadline={deadline}
          isEditable={isEditable}
          onChange={onChange}
        />
      ))}
    </div>
  );
}
