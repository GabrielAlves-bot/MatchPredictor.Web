import "./styles.css";
import { MatchCard } from "../MatchCard";
import type { IMatch } from "../../types/MatchType";

interface IProps {
  matches: IMatch[]
}

export function MatchList({ matches }: IProps) {
  return (
    <div className="match-list">
      {matches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  );
}