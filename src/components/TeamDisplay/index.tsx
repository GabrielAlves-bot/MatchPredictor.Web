import "./styles.css";

import { TeamShield } from "../TeamShield";

interface IProps {
  shieldUrl: string;
  name: string;
}

export function TeamDisplay({ shieldUrl, name }: IProps) {
  return (
    <div className="match-card__team">
      <TeamShield shieldUrl={shieldUrl} teamName={name} />
      <span className="match-card__team-name">{name}</span>
    </div>
  );
}