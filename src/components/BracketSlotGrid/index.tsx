import "./styles.css";
import type { BracketSlot } from "../../hooks/useBracket";
import { BracketSlotCard } from "../BracketSlotCard";

interface BracketSlotGridProps {
  slots: BracketSlot[];
  onSelect: (slot: BracketSlot) => void;
  onClear: (slot: BracketSlot) => void;
}

export function BracketSlotGrid({ slots, onSelect, onClear }: BracketSlotGridProps) {
  return (
    <div className="bracket-slot-grid">
      {slots.map((slot) => (
        <BracketSlotCard
          key={`${slot.stage}_${slot.slotIndex}`}
          slot={slot}
          onSelect={onSelect}
          onClear={onClear}
        />
      ))}
    </div>
  );
}
