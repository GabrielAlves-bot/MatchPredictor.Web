import "./styles.css";

interface UserStandingCardProps {
  name: string;
  position: number;
  totalPoints: number;
}

export function UserStandingCard({ name, position, totalPoints }: UserStandingCardProps) {
  return (
    <div className="user-standing-card">
      <h3 className="user-standing-card__name">{name}</h3>
      <div className="user-standing-card__ranking">
        <span className="user-standing-card__position">#{position}</span>
        <span className="user-standing-card__points">{totalPoints} PTS</span>
      </div>
    </div>
  );
}
