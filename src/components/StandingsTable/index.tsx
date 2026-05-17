import { StandingRow, type IStandingEntry } from "../StandingRow";
import "./styles.css";

interface StandingsTableProps {
  entries: IStandingEntry[];
}

export function StandingsTable({ entries }: StandingsTableProps) {
  return (
    <>
      <div className="standings-table__header">
        <div className="standings-table__header-rank">Pos</div>
        <div className="standings-table__header-user">Usuário</div>
        <div className="standings-table__header-points">Pts</div>
      </div>

      <div className="standings-table__list">
        {entries.map((entry) => (
          <StandingRow key={entry.rank} {...entry} />
        ))}
      </div>
    </>
  );
}
