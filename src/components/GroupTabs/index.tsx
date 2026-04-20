import type { IMatch } from "../../types/MatchType";
import "./styles.css";

interface IGroupTabsProps {
  matches: IMatch[];
  selectedGroup: string;
  onGroupChange: (group: string) => void;
}

function getUniqueGroups(matches: IMatch[]): string[] {
  return Array.from(
    new Set(
      matches
        .map((item) => item.group)
        .filter((group): group is string => Boolean(group))
    )
  ).sort((a, b) => a.localeCompare(b));
}

export function GroupTabs({ matches, selectedGroup, onGroupChange }: IGroupTabsProps) {
  const groups = getUniqueGroups(matches);

  return (
    <nav className="group-tabs">
      {groups.map((group) => (
        <button
          key={group}
          className={`group-tabs__btn${selectedGroup === group ? " group-tabs__btn--active" : ""}`}
          onClick={() => onGroupChange(group)}
        >
          Grupo {group}
        </button>
      ))}
    </nav>
  );
}