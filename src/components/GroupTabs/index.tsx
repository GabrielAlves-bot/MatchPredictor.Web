import "./styles.css";

const GROUPS = ["A", "B", "C", "D", "E", "F", "G", "H"];

export function GroupTabs() {
  return (
    <div className="group-tabs">
      {GROUPS.map((group, index) => (
        <button
          key={group}
          className={`group-tabs__btn${index === 0 ? " group-tabs__btn--active" : ""}`}
        >
          Grupo {group}
        </button>
      ))}
    </div>
  );
}
