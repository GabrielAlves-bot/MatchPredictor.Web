import "./styles.css";

export interface IStandingEntry {
  rank: number;
  name: string;
  points: number;
  poolParticipantId: number;
  isCurrentUser?: boolean;
}

interface RankBadgeProps {
  rank: number;
  isCurrentUser: boolean;
}

function RankBadge({ rank, isCurrentUser }: RankBadgeProps) {
  const badgeClass = isCurrentUser
    ? "standing-row__badge--user"
    : rank === 1
      ? "standing-row__badge--gold"
      : rank === 2
        ? "standing-row__badge--silver"
        : "standing-row__badge--normal";

  return (
    <span className={`standing-row__badge ${badgeClass}`}>{rank}</span>
  );
}

interface StandingRowProps extends IStandingEntry {
  onClick?: (poolParticipantId: number) => void;
}

export function StandingRow({
  rank,
  name,
  points,
  poolParticipantId,
  isCurrentUser = false,
  onClick,
}: StandingRowProps) {
  return (
    <div
      className={`standing-row${isCurrentUser ? " standing-row--highlight" : ""}${onClick ? " standing-row--clickable" : ""}`}
      onClick={() => onClick?.(poolParticipantId)}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => e.key === "Enter" && onClick?.(poolParticipantId)}
    >
      <div className="standing-row__rank">
        <RankBadge rank={rank} isCurrentUser={isCurrentUser} />
      </div>

      <div className="standing-row__user">
        {isCurrentUser && (
          <div className="standing-row__avatar-container">
            <div className="standing-row__star-badge">
              <span className="material-symbols-outlined">star</span>
            </div>
          </div>
        )}
        <span className="standing-row__name">{name}</span>
      </div>

      <div className="standing-row__points-group">
        <span className="standing-row__points">{points}</span>
        {onClick && (
          <span className="material-symbols-outlined standing-row__chevron">
            chevron_right
          </span>
        )}
      </div>
    </div>
  );
}
