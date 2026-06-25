import "./styles.css";
import type { QualifierSlot } from "../../hooks/useBracketQualifier";
import { BracketQualifierSlotCard } from "../BracketQualifierSlotCard";

interface BracketQualifierSlotGridProps {
  slots: QualifierSlot[];
  isReadOnly: boolean;
  onSelect: (slot: QualifierSlot) => void;
  onClear: (slot: QualifierSlot) => void;
}

export function BracketQualifierSlotGrid({ slots, isReadOnly, onSelect, onClear }: BracketQualifierSlotGridProps) {
  return (
    <div className="bq-slot-grid">
      {slots.map((slot) => (
        <BracketQualifierSlotCard
          key={`${slot.stage}_${slot.slotIndex}`}
          slot={slot}
          isReadOnly={isReadOnly}
          onSelect={onSelect}
          onClear={onClear}
        />
      ))}
    </div>
  );
}