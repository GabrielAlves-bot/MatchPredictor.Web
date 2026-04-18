import "./styles.css";

export function SkeletonMatchCard() {
  return (
    <div className="skeleton-match-card">
      <div className="skeleton-match-card__header">
        <div className="skeleton-bar" style={{ width: 80, height: 10, marginTop: 4 }} />
        <div className="skeleton-bar" style={{ width: 50, height: 18, borderRadius: 4 }} />
      </div>

      <div className="skeleton-match-card__grid">
        <div className="skeleton-match-card__team">
          <div className="skeleton-match-card__flag" />
          <div className="skeleton-bar" style={{ width: 48, height: 10 }} />
        </div>

        <div className="skeleton-match-card__score">
          <div className="skeleton-match-card__input" />
          <div className="skeleton-match-card__divider" />
          <div className="skeleton-match-card__input" />
        </div>

        <div className="skeleton-match-card__team">
          <div className="skeleton-match-card__flag" />
          <div className="skeleton-bar" style={{ width: 48, height: 10 }} />
        </div>
      </div>
    </div>
  );
}
