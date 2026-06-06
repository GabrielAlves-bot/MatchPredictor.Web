import "./styles.css";
import { BracketTeamRow } from "../BracketTeamRow";
import type { BracketGroupView } from "../../types/BracketTypes";

interface BracketGroupCardProps {
  group: BracketGroupView;
  isGroupStage: boolean;
  thirdPlaceFull: boolean;
  onToggle: (groupKey: string, teamId: number) => void;
}

export function BracketGroupCard({
  group,
  isGroupStage,
  thirdPlaceFull,
  onToggle,
}: BracketGroupCardProps) {
  const { key, label, teams, selectedIds, maxSelectable, isComplete } = group;
  const selectedSet = new Set(selectedIds);

  const badgeClass = isComplete
    ? "bracket-group-card__badge--complete"
    : "bracket-group-card__badge--pending";

  const badgeLabel = isComplete ? "CONCLUÍDO" : "PENDENTE";

  return (
    <div className="bracket-group-card">
      <div className="bracket-group-card__header">
        <span className="bracket-group-card__name">{label}</span>
        <span className={`bracket-group-card__badge ${badgeClass}`}>{badgeLabel}</span>
      </div>

      <div className="bracket-group-card__team-list">
        {teams.map((team, index) => {
          const isSelected = selectedSet.has(team.id);
          const isAuto = isGroupStage && index < 2;

          const isThirdPlace = isGroupStage && index >= 2;
          const maxReached = selectedIds.length >= maxSelectable && !isSelected;
          const thirdPlaceBlocked = isThirdPlace && thirdPlaceFull && !isSelected;

          const isDisabled = maxReached || thirdPlaceBlocked;

          return (
            <BracketTeamRow
              key={team.id}
              team={team}
              rank={isSelected ? selectedIds.indexOf(team.id) + 1 : undefined}
              isSelected={isSelected}
              isAuto={isAuto}
              isDisabled={isDisabled}
              onToggle={(teamId) => onToggle(key, teamId)}
            />
          );
        })}
      </div>
    </div>
  );
}