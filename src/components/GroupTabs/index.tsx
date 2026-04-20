import type { IMatch } from "../../types/MatchType";
import "./styles.css";

interface IProps {
  matches: IMatch[];
}

function getUniqueGroups(matches: IMatch[]): string[] {
  return Array.from(
    new Set(
      matches
        .map((item) => item.group)
        .filter((group): group is string => Boolean(group))
    )
  );
}

export function GroupTabs({ matches }: IProps) {
  const groups = getUniqueGroups(matches);

  return (
    <div className="group-tabs">
      {groups.map((group, index) => (
        <button
          key={group}
          className={`group-tabs__btn ${
            index === 0 ? "group-tabs__btn--active" : ""
          }`}
        >
          Grupo {group}
        </button>
      ))}
    </div>
  );
}