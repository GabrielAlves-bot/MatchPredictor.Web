import "./styles.css";

const PHASES = [
  "Fase de Grupos",
  "Oitavas",
  "Quartas",
  "Semifinal",
  "Final",
];

export function PhaseTabs() {
  return (
    <nav className="phase-tabs">
      {PHASES.map((phase, index) => (
        <button
          key={phase}
          className={`phase-tabs__chip${index === 0 ? " phase-tabs__chip--active" : ""}`}
        >
          {phase}
        </button>
      ))}
    </nav>
  );
}
