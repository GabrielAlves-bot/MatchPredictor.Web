import { formatMatchDate } from "../../helpers/FormatDate";
import type { IMatch } from "../../types/MatchType";
import { MatchStatusBadge } from "../MatchStatusBadge";
import { TeamDisplay } from "../TeamDisplay";
import "./styles.css";

interface IProps {
  match: IMatch
}

export function MatchCard({ match }: IProps) {
  return (
    <div className="match-card">
      <div className="match-card__header">
        <div>
          <p className="match-card__info-date">
            {formatMatchDate(match.date)}
          </p>
          <p className="match-card__info-venue">{match.stadium}, {match.city}</p>
        </div>
        <MatchStatusBadge matchStatus={match.status} />
      </div>

      <div className="match-card__grid">
        <TeamDisplay shieldUrl={match.homeTeam.shieldUrl} name={match.homeTeam.name} />

        <div className="match-card__score">
          <input
            name="homeGoals"
            className="match-card__score-input"
            value={match.homeGoals}
            type="number"
            disabled
          />
          <span className="match-card__score-divider">X</span>
          <input
            name="awayGoals"
            className="match-card__score-input"
            value={match.awayGoals}
            type="number"
            disabled
          />
        </div>
        <TeamDisplay shieldUrl={match.awayTeam.shieldUrl} name={match.awayTeam.name} />
      </div>
    </div>
  );
}
