import { getUniqueRounds } from "../../helpers/helpers";
import type { IMatch } from "../../types/MatchType";
import "./styles.css";

interface IProps {
  matches: IMatch[];
  selectedRound: string;
  onRoundChange: (round: string) => void;
}

export function RoundTabs({ matches, selectedRound, onRoundChange }: IProps) {
  const rounds = getUniqueRounds(matches);

  return (
    <nav className="group-tabs">
      {rounds.map((round) => (
        <button
          key={round}
          className={`group-tabs__btn${selectedRound === round ? " group-tabs__btn--active" : ""}`}
          onClick={() => onRoundChange(round)}
        >
          Rodada {round}
        </button>
      ))}
    </nav>
  );
}
