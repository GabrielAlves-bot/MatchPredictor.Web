import "./styles.css";

export interface IStandingEntry {
  rank: number;
  name: string;
  points: number;
  isCurrentUser?: boolean;
}

function RankBadge({ rank, isCurrentUser }: { rank: number; isCurrentUser: boolean }) {
  const badgeClass =
    isCurrentUser
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

export function StandingRow({ rank, name, points, isCurrentUser = false }: IStandingEntry) {
  return (
    <div className={`standing-row${isCurrentUser ? " standing-row--highlight" : ""}`}>
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

      <div className="standing-row__points">{points}</div>
    </div>
  );
}
