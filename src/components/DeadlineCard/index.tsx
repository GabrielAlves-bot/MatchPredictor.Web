import "./styles.css";
import { KnockoutStage } from "../../enums/KnockoutStage";
import { MatchPhase } from "../../enums/MatchPhase";
import type { IPredictionDeadline } from "../../types/PredictionDeadline";

interface DeadlineCardProps {
  deadline: IPredictionDeadline;
  isEditable?: boolean;
  onChange: (id: number, deadLine: Date) => void;
}

const KNOCKOUT_LABEL: Record<KnockoutStage, string> = {
  [KnockoutStage.None]: "",
  [KnockoutStage.RoundOf32]: "Segunda Fase",
  [KnockoutStage.RoundOf16]: "Oitavas de Final",
  [KnockoutStage.QuarterFinal]: "Quartas de Final",
  [KnockoutStage.SemiFinal]: "Semifinal",
  [KnockoutStage.ThirdPlaceMatch]: "Disputa do 3º lugar",
  [KnockoutStage.Final]: "Final",
};

function getLabel(deadline: IPredictionDeadline): string {
  if (deadline.matchPhase === MatchPhase.GroupStage && deadline.round) {
    const ordinals = ["1ª", "2ª", "3ª", "4ª", "5ª", "6ª"];
    const ordinal = ordinals[deadline.round - 1] ?? `${deadline.round}ª`;
    return `${ordinal} Rodada`;
  }

  if (
    deadline.matchPhase === MatchPhase.Knockout &&
    deadline.knockoutStage !== undefined
  ) {
    return KNOCKOUT_LABEL[deadline.knockoutStage] ?? "Fase Eliminatória";
  }

  return "Prazo";
}

function formatCurrentDate(date?: Date): string {
  if (!date) return "—";
  return `até ${new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}

function toInputValue(date?: Date): string {
  if (!date) return "";
  const d = new Date(date);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function DeadlineCard({ deadline, isEditable = false, onChange }: DeadlineCardProps) {
  return (
    <div className="deadline-card">
      <div className="deadline-card__header">
        <span className="deadline-card__label">{getLabel(deadline)}</span>
        <span className="deadline-card__current">
          {formatCurrentDate(deadline.deadLine)}
        </span>
      </div>

      {isEditable ? (
        <input
          className="deadline-card__input"
          type="datetime-local"
          value={toInputValue(deadline.deadLine)}
          onChange={(e) => onChange(deadline.id, new Date(e.target.value))}
        />
      ) : (
        <div className="deadline-card__readonly">
          <span className="material-symbols-outlined">schedule</span>
          <span>{formatCurrentDate(deadline.deadLine)}</span>
        </div>
      )}
    </div>
  );
}
