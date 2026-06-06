import "./styles.css";
import type { BracketPhaseView } from "../../types/BracketTypes";
interface BracketPhaseTabsProps {
  phases: BracketPhaseView[];
  activeTab: number;
  onTabChange: (index: number) => void;
}

export function BracketPhaseTabs({ phases, activeTab, onTabChange }: BracketPhaseTabsProps) {
  return (
    <nav className="bracket-phase-tabs">
      {phases.map((phase, index) => (
        <button
          key={phase.label}
          className={`bracket-phase-tabs__tab${index === activeTab ? " bracket-phase-tabs__tab--active" : ""}`}
          onClick={() => onTabChange(index)}
        >
          {phase.label}
        </button>
      ))}
    </nav>
  );
}
