import "./styles.css";
import type { BracketSlot } from "../../hooks/useBracket";

interface BracketSlotCardProps {
  slot: BracketSlot;
  onSelect: (slot: BracketSlot) => void;
  onClear: (slot: BracketSlot) => void;
}

export function BracketSlotCard({ slot, onSelect, onClear }: BracketSlotCardProps) {
  const slotLabel = String(slot.slotIndex + 1).padStart(2, "0");
  const isFilled = slot.team !== null;

  const classNames = [
    "bracket-slot-card",
    isFilled ? "bracket-slot-card--filled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  function handleClick() {
    if (isFilled) onClear(slot);
    else onSelect(slot);
  }

  return (
    <div className={classNames} onClick={handleClick}>
      <div className="bracket-slot-card__left">
        <div className="bracket-slot-card__number-box">
          <span className="bracket-slot-card__number-label">Slot</span>
          <span className="bracket-slot-card__number">{slotLabel}</span>
        </div>

        <div className="bracket-slot-card__info">
          {slot.team?.shieldUrl && (
            <img
              alt={slot.team.name}
              className="bracket-slot-card__flag"
              src={slot.team.shieldUrl}
            />
          )}
          <span
            className={`bracket-slot-card__team-name${
              isFilled
                ? " bracket-slot-card__team-name--filled"
                : " bracket-slot-card__team-name--empty"
            }`}
          >
            {isFilled ? slot.team!.name : "Selecionar Time"}
          </span>
        </div>
      </div>

      <div className="bracket-slot-card__action">
        <span className="material-symbols-outlined">
          {isFilled ? "close" : "add"}
        </span>
      </div>
    </div>
  );
}