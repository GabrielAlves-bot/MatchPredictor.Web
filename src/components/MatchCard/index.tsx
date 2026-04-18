import "./styles.css";

interface Team {
  name: string;
  flagSrc: string;
  flagAlt: string;
}

interface MatchCardProps {
  date: string;
  venue: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore?: string;
  awayScore?: string;
  saved?: boolean;
}

export function MatchCard({
  date,
  venue,
  homeTeam,
  awayTeam,
  homeScore = "0",
  awayScore = "0",
  saved = false,
}: MatchCardProps) {
  return (
    <div className="match-card">
      <div className="match-card__header">
        <div>
          <p className="match-card__info-date">{date}</p>
          <p className="match-card__info-venue">{venue}</p>
        </div>
        {saved && (
          <div className="match-card__status-badge">
            <span className="material-symbols-outlined">check_circle</span>
            <span className="match-card__status-text">SALVO</span>
          </div>
        )}
      </div>

      <div className="match-card__grid">
        <div className="match-card__team">
          <img
            alt={homeTeam.flagAlt}
            className="match-card__team-flag"
            src={homeTeam.flagSrc}
          />
          <span className="match-card__team-name">{homeTeam.name}</span>
        </div>

        <div className="match-card__score">
          <input
            className="match-card__score-input"
            placeholder={homeScore}
            type="number"
          />
          <span className="match-card__score-divider">X</span>
          <input
            className="match-card__score-input"
            placeholder={awayScore}
            type="number"
          />
        </div>

        <div className="match-card__team">
          <img
            alt={awayTeam.flagAlt}
            className="match-card__team-flag"
            src={awayTeam.flagSrc}
          />
          <span className="match-card__team-name">{awayTeam.name}</span>
        </div>
      </div>
    </div>
  );
}
