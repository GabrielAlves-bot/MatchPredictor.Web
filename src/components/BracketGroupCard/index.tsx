import "./styles.css";
import { BracketTeamRow } from "../BracketTeamRow";
import type { BracketGroupView } from "../../types/BracketTypes";
import { GROUP_QUALIFIERS, MAX_SELECTABLE_PER_GROUP } from "../../constants/bracketConstants";

interface BracketGroupCardProps {
  group: BracketGroupView;
  isGroupStage: boolean;
  onToggle: (groupKey: string, teamId: number) => void;
}

export function BracketGroupCard({
  group,
  isGroupStage,
  onToggle,
}: BracketGroupCardProps) {
  const {
    key,
    label,
    teams,
    selectedIds,
    thirdPlaceFull,
    isComplete,
  } = group;

  const selectedSet = new Set(selectedIds);

  const groupHasThirdSelected = isGroupStage && selectedIds.length >= MAX_SELECTABLE_PER_GROUP;

  const groupFull = isGroupStage && selectedIds.length >= MAX_SELECTABLE_PER_GROUP;

  const badgeClass = isComplete
    ? "bracket-group-card__badge--complete"
    : "bracket-group-card__badge--pending";

  const badgeLabel = isComplete ? "CONCLUÍDO" : "PENDENTE";

  return (
    <div className="bracket-group-card">
      <div className="bracket-group-card__header">
        <span className="bracket-group-card__name">{label}</span>
        <span className={`bracket-group-card__badge ${badgeClass}`}>
          {badgeLabel}
        </span>
      </div>

      <div className="bracket-group-card__team-list">
        {teams.map((team) => {
          const isSelected    = selectedSet.has(team.id);
          const selectionRank = isSelected
            ? selectedIds.indexOf(team.id) + 1
            : undefined;

          const blockedByGroupFull = groupFull && !isSelected;

          const blockedByThirdCap =
            isGroupStage &&
            thirdPlaceFull &&
            !groupHasThirdSelected &&
            selectedIds.length >= GROUP_QUALIFIERS &&
            !isSelected;

          const isDisabled = blockedByGroupFull || blockedByThirdCap;

          return (
            <BracketTeamRow
              key={team.id}
              team={team}
              rank={selectionRank}
              isSelected={isSelected}
              isDisabled={isDisabled}
              onToggle={(teamId) => onToggle(key, teamId)}
            />
          );
        })}
      </div>
    </div>
  );
}
