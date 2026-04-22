import PHASE_OPTIONS from "../../constants/PhaseOptions";
import { MatchPhase } from "../../enums/MatchPhase";
import "./styles.css";

interface IProps {
  selectedPhase: MatchPhase;
  onPhaseChange: (phase: MatchPhase) => void;
}

export function PhaseTabs({ selectedPhase, onPhaseChange }: IProps) {
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
