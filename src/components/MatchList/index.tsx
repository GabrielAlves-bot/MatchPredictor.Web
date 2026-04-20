import "./styles.css";
import { MatchCard } from "../MatchCard";
import type { IMatch } from "../../types/MatchType";

interface IProps {
  matches: IMatch[]
}

export function MatchList({ matches }: IProps) {
  if (matches.length === 0) {
    return (
      <div className="match-list match-list--empty">
        <p>Sem jogos para esta aba.</p>
      </div>
    );
  }

  return (
    <div className="match-list">
      {matches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  );
}