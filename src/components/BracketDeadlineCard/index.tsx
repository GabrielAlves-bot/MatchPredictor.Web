import "./styles.css";
import { KnockoutStage } from "../../enums/KnockoutStage";
import { MatchPhase } from "../../enums/MatchPhase";
import type { IBracketGuessDeadline } from "../../types/BracketGuessDeadlineType";

interface BracketDeadlineCardProps {
  deadline: IBracketGuessDeadline;
  isEditable?: boolean;
  onChange: (id: number, deadLine: Date) => void;
}

const KNOCKOUT_LABEL: Record<KnockoutStage, string> = {
  [KnockoutStage.None]: "Fase De Grupos",
  [KnockoutStage.RoundOf32]: "Segunda Fase",
  [KnockoutStage.RoundOf16]: "Oitavas de Final",
  [KnockoutStage.QuarterFinal]: "Quartas de Final",
  [KnockoutStage.SemiFinal]: "Semifinal",
  [KnockoutStage.ThirdPlaceMatch]: "Disputa do 3º lugar",
  [KnockoutStage.Final]: "Final",
};

function getLabel(deadline: IBracketGuessDeadline): string {
  if (
    deadline.matchPhase === MatchPhase.Knockout &&
    deadline.knockoutStage !== undefined
  ) {
    return KNOCKOUT_LABEL[deadline.knockoutStage] ?? "Fase Eliminatória";
  }

  return "Prazo do Chaveamento";
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

export function BracketDeadlineCard({
  deadline,
  isEditable = false,
  onChange,
}: BracketDeadlineCardProps) {
  return (
    <div className="bracket-deadline-card">
      <div className="bracket-deadline-card__header">
        <span className="bracket-deadline-card__label">{getLabel(deadline)}</span>
        <span className="bracket-deadline-card__current">
          {formatCurrentDate(deadline.deadLine)}
        </span>
      </div>

      {isEditable ? (
        <input
          className="bracket-deadline-card__input"
          type="datetime-local"
          value={toInputValue(deadline.deadLine)}
          onChange={(e) => onChange(deadline.id, new Date(e.target.value))}
        />
      ) : (
        <div className="bracket-deadline-card__readonly">
          <span className="material-symbols-outlined">schedule</span>
          <span>{formatCurrentDate(deadline.deadLine)}</span>
        </div>
      )}
    </div>
  );
}
