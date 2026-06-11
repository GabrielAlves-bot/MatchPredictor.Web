import { MatchStatus } from "../../enums/MatchStatus";
import { getMatchStatusLabel } from "../../helpers/MatchStatusLabel";
import EventIcon from "@mui/icons-material/Event";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import "./styles.css";

interface IProps {
  matchStatus: MatchStatus;
  isEditable?: boolean;
  onStatusChange?: (value: MatchStatus) => void;
}

const STATUS_OPTIONS = [
  { value: MatchStatus.Scheduled, label: getMatchStatusLabel(MatchStatus.Scheduled) },
  { value: MatchStatus.InProgress, label: getMatchStatusLabel(MatchStatus.InProgress) },
  { value: MatchStatus.Finished, label: getMatchStatusLabel(MatchStatus.Finished) },
  { value: MatchStatus.Cancelled, label: getMatchStatusLabel(MatchStatus.Cancelled) },
];

function getIconAndModifier(matchStatus: MatchStatus): {
  IconComponent: React.ElementType;
  modifier: string;
} {
  switch (matchStatus) {
    case MatchStatus.Scheduled:
      return { IconComponent: EventIcon, modifier: "scheduled" };
    case MatchStatus.Finished:
      return { IconComponent: CheckCircleIcon, modifier: "finished" };
    case MatchStatus.Cancelled:
      return { IconComponent: CancelIcon, modifier: "cancelled" };
    case MatchStatus.InProgress:
      return { IconComponent: PlayCircleIcon, modifier: "inProgress" };
    default:
      return { IconComponent: EventIcon, modifier: "scheduled" };
  }
}

export function MatchStatusBadge({ matchStatus, isEditable = false, onStatusChange }: IProps) {
  const { IconComponent, modifier } = getIconAndModifier(matchStatus);
  const text = getMatchStatusLabel(matchStatus);

  if (isEditable) {
    return (
      <div className={`match-card__status-badge match-card__status-badge--${modifier} match-card__status-badge--editable`}>
        <IconComponent />
        <select
          className="match-card__status-select"
          value={matchStatus}
          onChange={(e) => onStatusChange?.(Number(e.target.value) as MatchStatus)}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className={`match-card__status-badge match-card__status-badge--${modifier}`}>
      <IconComponent />
      <span className="match-card__status-text">{text}</span>
    </div>
  );
}