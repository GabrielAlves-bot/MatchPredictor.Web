import { MatchPhase } from "../../enums/MatchPhase";
import "./styles.css";

const PHASE_OPTIONS = [
  { label: "Fase de Grupos", value: MatchPhase.GroupStage },
  { label: "Mata-mata", value: MatchPhase.Knockout },
];

interface IPhaseTabsProps {
  selectedPhase: MatchPhase;
  onPhaseChange: (phase: MatchPhase) => void;
}

export function PhaseTabs({ selectedPhase, onPhaseChange }: IPhaseTabsProps) {
  return (
    <nav className="phase-tabs">
      {PHASE_OPTIONS.map(({ label, value }) => (
        <button
          key={value}
          className={`phase-tabs__chip${selectedPhase === value ? " phase-tabs__chip--active" : ""}`}
          onClick={() => onPhaseChange(value)}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
