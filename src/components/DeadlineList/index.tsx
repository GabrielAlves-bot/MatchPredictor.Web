import "./styles.css";
import type { IPredictionDeadline } from "../../types/PredictionDeadline";
import { DeadlineCard } from "../DeadlineCard";

interface DeadlineListProps {
  deadlines: IPredictionDeadline[];
  isEditable?: boolean;
  onChange: (id: number, deadLine: Date) => void;
}

export function DeadlineList({ deadlines, isEditable = false, onChange }: DeadlineListProps) {
  return (
    <div className="deadline-list">
      {deadlines.map((deadline) => (
        <DeadlineCard
          key={deadline.id}
          deadline={deadline}
          isEditable={isEditable}
          onChange={onChange}
        />
      ))}
    </div>
  );
}
