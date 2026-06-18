import "./styles.css";
import { TeamShield } from "../TeamShield";
import type { IMatch } from "../../types/MatchType";
import { formatMatchDate } from "../../helpers/FormatDate";
import { MatchStatusBadge } from "../MatchStatusBadge";

interface IProps {
  match: IMatch;
}

export function MatchHeroCard({ match }: IProps) {
  return (
    <div className="match-hero-card">
      <div className="match-hero-card__info">
        <span className="match-hero-card__date">{formatMatchDate(match.date)}</span>
        <span className="match-hero-card__venue">
          {match.stadium}, {match.city}
        </span>
      </div>

      <div className="match-hero-card__teams">
        <div className="match-hero-card__team">
          <TeamShield
            shieldUrl={match.homeTeam.shieldUrl}
            teamName={match.homeTeam.name}
            className="match-hero-card__shield"
          />
          <span className="match-hero-card__team-name">{match.homeTeam.name}</span>
        </div>

        <div className="match-hero-card__score-box">
          <div className="match-hero-card__score">
            <span>{match.homeGoals ?? "–"}</span>
            <span className="match-hero-card__score-vs">x</span>
            <span>{match.awayGoals ?? "–"}</span>
          </div>
          <MatchStatusBadge
            matchStatus={match.status}
            isEditable={false}
            onStatusChange={() => {}}
          />
        </div>

        <div className="match-hero-card__team">
          <TeamShield
            shieldUrl={match.awayTeam.shieldUrl}
            teamName={match.awayTeam.name}
            className="match-hero-card__shield"
          />
          <span className="match-hero-card__team-name">{match.awayTeam.name}</span>
        </div>
      </div>
    </div>
  );
}
