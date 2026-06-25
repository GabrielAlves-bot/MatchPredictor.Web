import "./styles.css";
import type { QualifierSlot } from "../../hooks/useBracketQualifier";

interface BracketQualifierSlotCardProps {
  slot: QualifierSlot;
  isReadOnly: boolean;
  onSelect: (slot: QualifierSlot) => void;
  onClear: (slot: QualifierSlot) => void;
}

export function BracketQualifierSlotCard({ slot, isReadOnly, onSelect, onClear }: BracketQualifierSlotCardProps) {
  const slotLabel = String(slot.slotIndex + 1).padStart(2, "0");
  const isFilled = slot.team !== null;

  const classNames = [
    "bq-slot-card",
    isFilled ? "bq-slot-card--filled" : "",
    isReadOnly ? "bq-slot-card--readonly" : "",
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
      <div className="bq-slot-card__left">
        <div className="bq-slot-card__number-box">
          <span className="bq-slot-card__number-label">Slot</span>
          <span className="bq-slot-card__number">{slotLabel}</span>
        </div>

        <div className="bq-slot-card__info">
          {slot.team?.shieldUrl && (
            <img
              alt={slot.team.name}
              className="bq-slot-card__flag"
              src={slot.team.shieldUrl}
            />
          )}
          <span
            className={`bq-slot-card__team-name${
              isFilled ? " bq-slot-card__team-name--filled" : " bq-slot-card__team-name--empty"
            }`}
          >
            {isFilled ? slot.team!.name : "Selecionar Time"}
          </span>
        </div>
      </div>

      <div className="bq-slot-card__action">
        <span className="material-symbols-outlined">
          {isReadOnly ? "lock" : isFilled ? "close" : "add"}
        </span>
      </div>
    </div>
  );
}