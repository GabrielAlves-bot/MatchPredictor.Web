import "./styles.css";
import type { BracketSlot } from "../../hooks/useBracket";

interface BracketSlotCardProps {
  slot: BracketSlot;
  isReadOnly: boolean;
  onSelect: (slot: BracketSlot) => void;
  onClear: (slot: BracketSlot) => void;
}

export function BracketSlotCard({ slot, isReadOnly, onSelect, onClear }: BracketSlotCardProps) {
  const slotLabel = String(slot.slotIndex + 1).padStart(2, "0");
  const isFilled = slot.team !== null;
  const hasPoints = slot.pointsEarned != null;

  const classNames = [
    "bracket-slot-card",
    isFilled ? "bracket-slot-card--filled" : "",
    isReadOnly ? "bracket-slot-card--readonly" : "",
  ]
    .filter(Boolean)
    .join(" ");

  function handleClick() {
    if (isReadOnly) return;
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

      <div className="bracket-slot-card__right">
        {hasPoints && (
          <div
            className={`bracket-slot-card__pts-badge${
              slot.pointsEarned! !== 0
                ? " bracket-slot-card__pts-badge--positive"
                : " bracket-slot-card__pts-badge--zero"
            }`}
          >
            <span className="bracket-slot-card__pts-value">
              {slot.pointsEarned! > 0 ? `+${slot.pointsEarned}` : slot.pointsEarned}
            </span>
            <span className="bracket-slot-card__pts-unit">pts</span>
          </div>
        )}

        <div className="bracket-slot-card__action">
          <span className="material-symbols-outlined">
            {isReadOnly ? "lock" : isFilled ? "close" : "add"}
          </span>
        </div>
      </div>
    </div>
  );
}