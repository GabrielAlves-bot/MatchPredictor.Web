import "./styles.css";
import type { ITeam } from "../../types/TeamType";

interface BracketTeamRowProps {
  team: ITeam;
  rank?: number;
  isSelected: boolean;
  isDisabled: boolean;
  onToggle: (teamId: number) => void;
}

export function BracketTeamRow({
  team,
  rank,
  isSelected,
  isDisabled,
  onToggle,
}: BracketTeamRowProps) {
  const classNames = [
    "bracket-team-row",
    isSelected               ? "bracket-team-row--selected"  : "",
    isDisabled && !isSelected ? "bracket-team-row--disabled"  : "",
  ]
    .filter(Boolean)
    .join(" ");

  function handleClick() {
    if (isDisabled && !isSelected) return;
    onToggle(team.id);
  }

  return (
    <div className={classNames} onClick={handleClick}>
      <div className="bracket-team-row__info">
        {team.shieldUrl ? (
          <img
            alt={team.name}
            className="bracket-team-row__flag"
            src={team.shieldUrl}
          />
        ) : (
          <div className="bracket-team-row__flag-placeholder">?</div>
        )}
        <span className="bracket-team-row__name">{team.name}</span>
      </div>

      <div
        className={`bracket-team-row__action${
          isSelected ? "" : " bracket-team-row__action--unselected"
        }`}
      >
        {rank !== undefined && (
          <span className="bracket-team-row__rank">{rank}º</span>
        )}
        <span
          className="material-symbols-outlined"
          style={isSelected ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          {isSelected ? "check_circle" : "add_circle"}
        </span>
      </div>
    </div>
  );
}
