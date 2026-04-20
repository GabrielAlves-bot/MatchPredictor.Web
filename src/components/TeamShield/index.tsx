import "./styles.css";

interface IProps {
  shieldUrl: string;
  teamName: string;
  className?: string;
}

export function TeamShield({ shieldUrl, teamName, className }: IProps) {
  return (
    <img
      className={className ?? "match-card__team-flag"}
      src={shieldUrl}
      alt={teamName}
    />
  );
}